import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { DatePipe, Location } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild ,Inject} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { DialogConfirmComponent, DialogRestoreComponent } from '@app/components';
import { Account, Brief,Brand,Client } from '@app/core/models';
import { AlertService, BrandService,AccountService,ClientService } from '@app/core/services';
import * as BriefActions from "@core/state/brief/brief.actions";
import * as BriefSelectors from "@core/state/brief/brief.selector";
import * as BrandActions from "@core/state/brand/brand.actions";
import * as BrandSelectors from "@core/state/brand/brand.selector";
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil,first } from 'rxjs/operators';
import * as XLSX from 'xlsx';
import {MatAccordion} from '@angular/material/expansion';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import {ThemePalette} from '@angular/material/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
	selectedBriefId: string;
  }

  /**
 * @title Dialog Overview
 */
@Component({
	templateUrl: './list.page.html',
	styleUrls: ['./list.page.scss'],
	providers: [
		DatePipe
	], animations: [
		trigger('detailExpand', [
		  state('collapsed', style({height: '0px', minHeight: '0'})),
		  state('expanded', style({height: '*'})),
		  transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	  ],
})
export class BriefListPage implements OnInit, OnDestroy {

	color: ThemePalette = 'primary';
	mode: ProgressSpinnerMode = 'determinate';
	value = 0;
	selectedBriefId!: string;
	bufferValue = 50;

	columnsToDisplay = ['deadlineDate', 'budget', 'offer','role'];
	columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];

	// will use the _destroy$ observable to control
	// fetching items from an observable
	private _destroy$ = new Subject<boolean>();

	private allData!: any[];
	public uiDataReady = false;
	public primaryData!: any[];
	public sortedData!: any[];
	public dataSource!: any[];

	public dataView$!: Observable<Brief[]>;
	public brandDataView$!: Observable<Brand[]>;

	//uiVars
	public isAuditing!: string;
	public isEditing!: string;
	public isDeleting!: string;
	public isRestoring!: string;

	// MatPaginator Inputs
	public length!: number;
	public pageSize = 10;
	public currentPage = 0;
	public pageSizeOptions: number[] = [5, 10, 40, 100];
	public briefTypes = [
		{
			id: 1,
			name: 'Created',
		},{
			id: 2,
			name: 'Resolved',

		},{
			id: 3,
			name: 'Approved',

		},{
			id: 4,
			name: 'InProgress',
		}
	]
	public dataBriefProgress = [
		{
			id: 1,
			name: 'Created',
		},{
			id: 2,
			name: 'Approved',

		},{
			id: 3,
			name: 'InProgress',

		},{
			id: 4,
			name: 'Resolved',
		}
	]
	// MatPaginator Output
	public pageEvent!: PageEvent;

	// Filter
	// autocomplete
	public chipCtrl = new FormControl();
	public visible = true;
	public selectable = true;
	public removable = true;
	public addOnBlur = true;
	readonly separatorKeysCodes: number[] = [ENTER, COMMA];
	@ViewChild('chipInput') chipInput!: ElementRef;
	@ViewChild(MatAccordion) accordion!: MatAccordion;

	//  select filter data
	public statusFilterValue: FormControl;

	// autocomplete filter
	public filteredNames!: Observable<any[] | undefined>;
	public activeNameFilters: any[] = [];
	public masterReference_names: any[] = [];

	brandData!: Brand;
		public brandDataview!: any[];
	myaccount!: Account;
		public accountDataview!: any[];
	myclient!: Client;
		public clientDataview!: any[];

	constructor(
		private store: Store,
		private actions$: Actions<any>,
		private alertService: AlertService,
		private dialog: MatDialog,
		private location: Location,
		private datePipe: DatePipe,

		private accountService: AccountService,
		private clientService: ClientService,
		private brandService: BrandService,
	) {
		
		this.storeInit();

		this.statusFilterValue = new FormControl(true);
		this.brandService.brand
			.pipe(takeUntil(this._destroy$))
			.subscribe((x:any) => this.brandData = x);
		this.accountService.account
			.pipe(takeUntil(this._destroy$))
			.subscribe((x:any) => this.myaccount = x);
		this.clientService.client
			.pipe(takeUntil(this._destroy$))
			.subscribe((x:any) => this.myclient = x);

		this.dataView$ = this.store.select(BriefSelectors.selectCollection);
	}

	ngOnInit() {

		this.uiStateInfo();
		console.warn('this.dataCEView$', this.dataView$);
		this.dataView$
			.pipe(takeUntil(this._destroy$))
			.subscribe(
				(data:Brief[]) =>  {

					console.warn('this.dataViewbrief$', data);

					if( data === null || data.length <= 0 ) return;

					//console.log(data[1].clientId);
					
					this.initialise(data);
					//this.initialiseFilterData();
				}
			);
		this.brandService.getAll()
			.pipe(first())
			.pipe(takeUntil(this._destroy$))
			.subscribe((brands:Brand[]) => {this.brandDataview = brands;});
		this.accountService.getAll()
			.pipe(first())
			.pipe(takeUntil(this._destroy$))
			.subscribe((accounts:Account[]) => {this.accountDataview = accounts;});
		this.clientService.getAll()
			.pipe(first())
			.pipe(takeUntil(this._destroy$))
			.subscribe((clients:Client[]) => {this.clientDataview = clients;});
	}

	ngOnDestroy(): void {
		//console.warn('Animations List ngOnDestroy');
		this._destroy$.next(false);
		this._destroy$.complete();
	}

	private storeInit():void {

		this.store.dispatch(new BriefActions.COLLECTION_LOAD_BRIEFS());
	}

	private uiStateInfo() {

		this.actions$
		.pipe(
			ofType(
				BriefActions.BriefActionTypes.MODEL_UpdateStatusSuccess,
				BriefActions.BriefActionTypes.MODEL_DeleteSuccess,
				BriefActions.BriefActionTypes.MODEL_RestoreSuccess,

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
				BriefActions.BriefActionTypes.MODEL_RestoreFailed,

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
	

	private initialise( data:Brief[]):void {


		this.primaryData = data;

		console.log(this.primaryData);
		this.sortedData  = this.primaryData.slice();
		this.dataSource = this.primaryData.slice();
		this.length = this.sortedData.length;
		this.value = this.primaryData.length+this.primaryData.length;
		this.iterator();
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
	public briefProgressModel(event:any,id: string): void {
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

	public back(): void {
		this.location.back();
	}

	public audit( id:number ): void {

		const model = this.primaryData.find((x) => x.id === id);

		//this.isAuditing = model.id;

		this.alertService.info( 'Version History still in WIP.', { keepAfterRouteChange: true });

	}

	public export(): void {

		const exportArray = this.primaryData.map( (data) => {

			return {
				'ID': data.id,
				'Offer': data.offer,
				'objective': data.objective,
				'business': data.business,
				'targetAudience': data.targetAudience,
				'targetAudienceInsight': data.targetAudienceInsight,
				'targetAudienceOuttake': data.targetAudienceOuttake,
				'singleMindedThought': data.singleMindedThought,
				'brandTone': data.brandTone,
				'budget': data.budget,
				'Role': data.role,
				'deadlineTime': data.deadlineTime,
				'deadlineDate': data.deadlineDate,
				'Status': (data.status === true) ? 'Active' : 'Inactive',
				'created': this.datePipe.transform(data.created, 'yyyy-MM-dd HH:mm:ss'),
				'updated': this.datePipe.transform(data.updated, 'yyyy-MM-dd HH:mm:ss'),
				'deletedAt': this.datePipe.transform(data.deletedAt, 'yyyy-MM-dd HH:mm:ss')
			}

		});

		/* generate worksheet */
		const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportArray);

		/* generate workbook and add the worksheet */
		const wb: XLSX.WorkBook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

		/* save to file */
		XLSX.writeFile(wb, 'TBWA_Africa_Conference_All_Briefs.xlsx');

	}

	// FILTERS
	private initialiseFilterData():void {

		this.initialiseTextFilters();

		this.onFilterChange('');

	}

	private initialiseTextFilters() {

		this.masterReference_names = this.allData.map( (jk: any) => {
			return {
				'id': jk.id,
				'offer': jk.offer
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
			case 'offer':

				/** /
				this.sortedData = [this.allData.find(x => x.id === event.option.value)];
				this.length = this.sortedData.length;
				this.activeNameFilters = this.sortedData;
				/**/
				this.activeNameFilters.push(this.allData.find(x => x.offer === event.option.value));

				if( this.activeNameFilters.length > 0 ) {
					this.activeNameFilters.forEach((x:any)=> {
						newdb.push(this.allData.filter((y:any) => {
							return y.offer === x.offer
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

	public removeSelectedFiltered(type:string): void {

		this.activeNameFilters = this.activeNameFilters.filter(x => x.offer !== type);

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
					return y.offer === x.offer
				}));
			});

			newdata = newbie.flat();
		}

		this.initialise(newdata);

	}

	// PAGINATION FUNCS
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
				case 'offer': return this.compare(a.offer, b.offer, isAsc);
				case 'objective': return this.compare(a.objective, b.objective, isAsc);
				case 'business': return this.compare(a.business, b.business, isAsc);
				case 'targetAudience': return this.compare(a.targetAudience, b.targetAudience, isAsc);
				case 'targetAudienceInsight': return this.compare(a.targetAudienceInsight, b.targetAudienceInsight, isAsc);
				case 'targetAudienceOuttake': return this.compare(a.targetAudienceOuttake, b.targetAudienceOuttake, isAsc);
				case 'singleMindedThought': return this.compare(a.singleMindedThought, b.singleMindedThought, isAsc);
				case 'brandTone': return this.compare(a.brandTone, b.brandTone, isAsc);
				case 'budget': return this.compare(a.budget, b.budget, isAsc);
				case 'deadlineTime': return this.compare(a.deadlineTime, b.deadlineTime, isAsc);
				case 'deadlineDate': return this.compare(a.deadlineDate, b.deadlineDate, isAsc);
				case 'status': return this.compare(a.status, b.status, isAsc);
				case 'lastEditedBy': return this.compare(a.lastEditedBy, b.lastEditedBy, isAsc);
				case 'created': return this.compare(a.created, b.created, isAsc);
				case 'updated': return this.compare(a.updated, b.updated, isAsc);
				case 'role': return this.compare(a.role, b.role, isAsc);
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

	public handlePage(e: any): void {
		this.currentPage = e.pageIndex;
		this.pageSize = e.pageSize;
		this.iterator();
	}

	private iterator(): void {
		const end = (this.currentPage + 1) * this.pageSize;
		const start = this.currentPage * this.pageSize;
		const part = this.primaryData.slice(start, end);
		this.sortedData = part;
	}

	public ListtrackByFn(index:number, item:any) {
		return index; // or item.id
	}
	public brandNoSlot(brandName :string) {
		let numberOfAvailableSlot = 0;
		for(let i = 0;i<this.brandDataview.length;i++)
		{
			if (this.brandDataview[i].name === brandName) {
				numberOfAvailableSlot = this.brandDataview[i].numberOfAvailableSlots;
			}
		}
		return numberOfAvailableSlot; 
	}

}