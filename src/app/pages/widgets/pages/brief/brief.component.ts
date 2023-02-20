import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, OnInit, Output,Input,Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Account,Role,Brief ,Client} from '@app/core/models';
import { AccountService,BriefService, ClientService,AlertService } from '@app/core/services';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { AuthService } from '@pages/auth/services/auth.service';
import { any } from 'underscore';
import { Sort } from '@angular/material/sort';
import { MatDialog} from '@angular/material/dialog';
import { Store } from "@ngrx/store";
import { Actions, ofType } from "@ngrx/effects";
import * as BriefSelectors from "@core/state/brief/brief.selector";
import * as BriefActions from "@core/state/brief/brief.actions";
import { C, COMMA, ENTER } from '@angular/cdk/keycodes';
import { DatePipe, Location } from '@angular/common';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { PageEvent } from '@angular/material/paginator';
import { DialogConfirmComponent, DialogRestoreComponent } from '@app/components';
import {animate, state, style, transition, trigger} from '@angular/animations';
import * as XLSX from 'xlsx';
import {MatAccordion} from '@angular/material/expansion';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import {ThemePalette} from '@angular/material/core';
import { DialogOverviewExampleDialog } from './dialog-overview-example-dialog.page';
import { DialogView} from './dialog-view.page'
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, SortDirection} from '@angular/material/sort';
import {merge,Subject, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, takeUntil,switchMap} from 'rxjs/operators';


  /**
 * @title Dialog Overview
 */
@Component({
	selector: 'app-widgets',
	templateUrl: './brief.component.html',
	styleUrls: ['./brief.component.scss'],
	providers: [
		DatePipe
	], animations: [
		trigger('detailExpand', [
		  state('collapsed', style({height: '0px', minHeight: '0'})),
		  state('expanded', style({height: '*'})),
		  transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	  ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BriefComponent implements OnInit, AfterViewInit {
	@Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
	@Output() toggleSidebarRightForMe: EventEmitter<any> = new EventEmitter();
	@Input() briefProgress = "";
	@Input() brandDataviews!: number;
	@Input() dataView!: Brief[] | null;

	public Role = Role;
	public account: Account | undefined;
	public isLoggedIn$!: Observable<boolean>;
	public sortedData!: any[];
	// MatPaginator Inputs
	public length!: number;
	public pageSize = 10;
	public currentPage = 0;
	public county = 0;
	public pageSizeOptions: number[] = [5, 10, 40, 100];
	resultsLength = 0;
	isLoadingResults = true;
	isRateLimitReached = false;
	public path = ROUTER_UTILS.config.base;
	public primaryData!: any[];
	public allData!: any;
	private _destroy$ = new Subject<boolean>();
	public statusFilterValue: FormControl;
	// autocomplete filter
	public filteredNames!: Observable<any[] | undefined>;
	public activeNameFilters: any[] = [];
	public masterReference_names: any[] = [];
	public chipCtrl = new FormControl();
	//uiVars
	public isAuditing!: string;
	public isEditing!: string;
	public isDeleting!: string;
	public isRestoring!: string;

	myclient!: Client;
	public clientDataview!: any[];

	constructor(
		private store: Store,
		private dialog: MatDialog,
		private router: Router,
		private actions$: Actions<any>,
		private alertService: AlertService,
		private authService: AuthService,

		private accountService: AccountService,
		private clientService: ClientService,
	) {
		this.statusFilterValue = new FormControl(true);

		this.clientService.client
			.pipe(takeUntil(this._destroy$))
			.subscribe((x:any) => this.myclient = x);

	}

	ngOnInit(): void {
		console.log('ngOnInit');
		this.uiStateInfo();
		this.isLoggedIn$ = this.authService.isLoggedIn$;
		this.allData = this.dataView;
		console.log(this.dataView)
		this.initialise(this.dataView);
		if(this.dataView !== undefined)
		{
			this.initialiseFilterData();
		}
	}
	
	private initialise( data:any):void {
			this.primaryData = data;
			this.sortedData = this.primaryData;
			if(this.sortedData !== undefined)
			{
				this.length = this.sortedData.length;
			}
			this.iterator();
	}
	private uiStateInfo() {
		this.actions$
		.pipe(
			ofType(
				BriefActions.BriefActionTypes.MODEL_UpdateStatusSuccess,
				BriefActions.BriefActionTypes.MODEL_DeleteSuccess,
				BriefActions.BriefActionTypes.MODEL_RestoreSuccess
			)
		)
		.pipe(takeUntil(this._destroy$))
		.subscribe({
			next: () => {
				this.alertService.success('Action successful.', { keepAfterRouteChange: true });
			},
			error: error => {
				this.alertService.error(error);
			}
		});

		this.actions$
		.pipe(
			ofType(
				BriefActions.BriefActionTypes.MODEL_UpdateStatusFailed,
				BriefActions.BriefActionTypes.MODEL_DeleteFailed,
				BriefActions.BriefActionTypes.MODEL_RestoreFailed

			)
		)
		.pipe(takeUntil(this._destroy$))
		.subscribe({
			next: (data) => {
				this.alertService.error(data.payload.error, { keepAfterRouteChange: true });
			},
			error: error => {
				this.alertService.error(error);
			}
		});
	}
	// FILTERS
	private initialiseFilterData():void {
		console.log("initialiseFilterData");
		this.initialiseTextFilters();
		this.onFilterChange('');

	}
	public onFilterChange( filter:string ): void {

		let newdata: any;

		newdata = this.allData;

		if( this.statusFilterValue.value && this.statusFilterValue.value !== undefined ) {
			newdata = newdata.filter((x:any) => {

				return x.status === this.statusFilterValue.value
			});
		}

		if( this.activeNameFilters.length > 0 ) {
			const newbie:any[] = [];
			this.activeNameFilters.forEach((x:any)=> {
				newbie.push(newdata.filter((y:any) => {
					return y.name === x.name
				}));
			});

			newdata = newbie.flat();
		}

		this.initialise(newdata);

	}
	public removeSelectedFiltered(type:string): void {

		this.activeNameFilters = this.activeNameFilters.filter(x => x.name !== type);

		this.onFilterChange('');
	}
	private initialiseTextFilters() {
		console.log("initialiseTextFilters");
		this.masterReference_names = this.allData.map( (jk: any) => {
			return {
				'id': jk.id,
				'name': jk.name
			}
		});
		//this.masterReference_locations = _.uniq(this.masterReference_locations, y => y.location);

		this.filteredNames = this.chipCtrl.valueChanges.pipe(
			startWith(null),
			map( (so: any | null) => {
				//console.warn('this.filteredNames:', so);

				if( Number(so) ) {
					return;
				}

				return so ? this.myTextFilter('name', so) : this.masterReference_names.slice()
		}));

	}

	private myTextFilter(type:string, name: string) {
		//console.warn(email);
		switch (type) {
			case 'name':
				return this.masterReference_names.filter(so => so.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
			default:
				return [];
		}
	}
	public selectedTextFilter(event: MatAutocompleteSelectedEvent, type: string): void {

		//this.removeSelectedFiltered(type);
		//this.filterAlphabet = 'all';
		const newdb:any[] = [];

		switch (type) {
			case 'name':

				this.activeNameFilters.push(this.allData.find((x: any) => x.name === event.option.value));

				if( this.activeNameFilters.length > 0 ) {
					this.activeNameFilters.forEach((x:any)=> {
						newdb.push(this.allData.filter((y:any) => {
							return y.name === x.name
						}));
					});
				}
				break;
			default:
				break;
		}

		//console.log('selectedTextFilter['+type+']:', this.sortedData);
		this.sortedData = newdb.flat();
		this.length = this.sortedData.length;

	}
	ngAfterViewInit() {
		console.log('ngAfterViewInit');
	}

	public logout() {
		this.accountService.logout();
		const { root, signIn } = ROUTER_UTILS.config.auth;
		this.router.navigate(['/']);
	}
	toggleSidebar() {
		this.toggleSidebarForMe.emit();
	  }
	  toggleSidebarRight() {
		this.toggleSidebarRightForMe.emit();
	  }
	  getInitials(firstName:string, lastName:string) {
		return firstName[0].toUpperCase() + lastName[0].toUpperCase();
	  }
	  public sortData(sort: Sort) : void {

		const data = this.sortedData.slice();
		if (!sort.active || sort.direction === '') {
			this.sortedData = data;
			return;
		}

		this.sortedData = data.sort((a, b) => {
			const isAsc = sort.direction === 'asc';
			switch (sort.active) {
				case 'id': return this.compare(a.id, b.id, isAsc);
				case 'name': return this.compare(a.name, b.name, isAsc);
				case 'description': return this.compare(a.description, b.description, isAsc);
				case 'status': return this.compare(a.status, b.status, isAsc);
				case 'lastEditedBy': return this.compare(a.lastEditedBy, b.lastEditedBy, isAsc);
				case 'created': return this.compare(a.created, b.created, isAsc);
				case 'updated': return this.compare(a.updated, b.updated, isAsc);
				case 'deletedAt': return this.compare(a.deletedAt, b.deletedAt, isAsc);
				default: return 0;
			}
		});
	}
	private compare(a: number | string | boolean, b: number | string | boolean, isAsc: boolean) : number {
		return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
	}
	public setPageSizeOptions(setPageSizeOptionsInput: string): void {
		if (setPageSizeOptionsInput) {
			this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
		}
	}
	openDialog(id:any): void {
		const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
		  width: '500px',
		  data: {selectedBriefId: id},
		});
		dialogRef.afterClosed().subscribe(result => {
		  console.log('The dialog was closed');
		});
	}
	openDialogView(id:any): void{
		console.log('openDialogView of id ',id);
		const dialogRef = this.dialog.open(DialogView,{
			data: {selectedBriefId: id},
		});
		dialogRef.afterClosed().subscribe(result => {
		  console.log(`Dialog result: ${result}`);
		});
	}
	  public handlePage(e: any): void {
		this.currentPage = e.pageIndex;
		this.pageSize = e.pageSize;
		this.iterator();
	}
	private iterator(): void {
		console.log("iterator")
		const end = (this.currentPage + 1) * this.pageSize;
		const start = this.currentPage * this.pageSize;
		if(this.primaryData !== undefined){
			const part = this.primaryData.slice(start, end);
			console.log(part);
			this.sortedData = part;
		}
		
	}
	public deleteModel(id: string): void {
		const model = this.primaryData.find((x) => x.id === id);

		this.isDeleting = model.id;

		const confirmDialog = this.dialog.open( DialogConfirmComponent, {
			data: {
				title: 'Confirm Delete Action',
				message: 'Are you sure you want to delete: ' + model.name
			}
		});
		confirmDialog.afterClosed().subscribe(result => {

			this.isDeleting = '';

			if (result === true) {

				this.store.dispatch(new BriefActions.MODEL_DeleteInitiated({ dataId: id }) );

			} else {
				//console.info('Cancel Removing ID:', id);
			}
		});
	}
	public audit( id:number | string ): void {

		const model = this.primaryData.find((x) => x.id === id);

		//this.isAuditing = model.id;

		this.alertService.info( 'Version History still in WIP.', { keepAfterRouteChange: true });

	}
	public restoreModel(id: string): void {
		const model = this.primaryData.find((x) => x.id === id);
		this.isRestoring = model.id;

		const confirmDialog = this.dialog.open( DialogRestoreComponent, {
			data: {
				title: 'Confirm Restoration Action',
				message: 'Are you sure you want to restore this record: ' + model.name
			}
		});
		confirmDialog.afterClosed().subscribe(result => {

			this.isRestoring = '';

			if (result === true) {

				this.store.dispatch(new BriefActions.MODEL_RestoreInitiated({ dataId: id }) );

			} else {}
		});
	}
	public toggleStatus(event:any, id: string):void {

		/**/
		this.updateStatus(id, {
			status: event.checked
		});
		/**/
	}
	private updateStatus( id: string, params: any ):void {

		this.store.dispatch(
			new BriefActions.MODEL_UpdateStatusInitiated({
				dataId: id,
				params: params
			})
		);

	}
}