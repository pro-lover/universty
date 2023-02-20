import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { DatePipe, Location } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { DialogConfirmComponent, DialogRestoreComponent } from '@app/components';
import { Account, BrandKPI } from '@app/core/models';
import { AccountService, AlertService } from '@app/core/services';
import * as BrandKPIActions from "@core/state/brandKPI/brandKPI.actions";
import * as BrandKPISelectors from "@core/state/brandKPI/brandKPI.selector";

import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import * as XLSX from 'xlsx';

@Component({
	templateUrl: './list.page.html',
	styleUrls: ['./list.page.scss'],
	providers: [
		DatePipe
	]
})
export class BrandKPIListPage implements OnInit, OnDestroy {

	// will use the _destroy$ observable to control
	// fetching items from an observable
	private _destroy$ = new Subject<boolean>();

	private allData!: any[];
	public uiDataReady = false;
	public primaryData!: any[];
	public sortedData!: any[];

	public dataView$!: Observable<BrandKPI[]>;

	public account!: Account;

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

	//  select filter data
	public statusFilterValue: FormControl;

	// autocomplete filter
	public filteredNames!: Observable<any[] | undefined>;
	public activeNameFilters: any[] = [];
	public masterReference_names: any[] = [];

	constructor(
		private store: Store,
		private actions$: Actions<any>,
		private alertService: AlertService,
		private dialog: MatDialog,
		private location: Location,
		private accountService: AccountService,
		private datePipe: DatePipe
	) {

		this.storeInit();

		this.statusFilterValue = new FormControl(true);


		this.accountService.account
			.pipe(takeUntil(this._destroy$))
			.subscribe((x:any) => this.account = x);

		this.dataView$ = this.store.select(BrandKPISelectors.selectCollection).pipe(takeUntil(this._destroy$));
	}

	ngOnInit() {

		this.uiStateInfo();

		this.dataView$
			.pipe(takeUntil(this._destroy$))
			.subscribe(
				(data:BrandKPI[]) =>  {

					console.warn('this.dataView$', data);

					if( data === null || data.length <= 0 ) return;

					this.allData = data;
					this.initialise(data);
					this.initialiseFilterData();
				}
			);
	}

	ngOnDestroy(): void {
		//console.warn('Animations List ngOnDestroy');
		this._destroy$.next(false);
		this._destroy$.complete();
	}

	private storeInit():void {

		this.store.dispatch(new BrandKPIActions.COLLECTION_LOAD_BRANDKPIS());

	}

	private uiStateInfo() {

		this.actions$
		.pipe(
			ofType(
				BrandKPIActions.BrandKPIActionTypes.MODEL_UpdateStatusSuccess,
				BrandKPIActions.BrandKPIActionTypes.MODEL_DeleteSuccess,
				BrandKPIActions.BrandKPIActionTypes.MODEL_RestoreSuccess
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
				BrandKPIActions.BrandKPIActionTypes.MODEL_UpdateStatusFailed,
				BrandKPIActions.BrandKPIActionTypes.MODEL_DeleteFailed,
				BrandKPIActions.BrandKPIActionTypes.MODEL_RestoreFailed

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

	private initialise( data:BrandKPI[]):void {

		this.primaryData = data;
		this.sortedData = this.primaryData.slice();
		this.length = this.sortedData.length;

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
			new BrandKPIActions.MODEL_UpdateStatusInitiated({
				dataId: id,
				params: params
			})
		);

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

				this.store.dispatch(new BrandKPIActions.MODEL_DeleteInitiated({ dataId: id }) );

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

				this.store.dispatch(new BrandKPIActions.MODEL_RestoreInitiated({ dataId: id }) );

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
				'Name': data.name,
				'description': data.description,
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
		XLSX.writeFile(wb, 'TBWA_Africa_Conference_All_BrandKPIs.xlsx');

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

				this.activeNameFilters.push(this.allData.find(x => x.name === event.option.value));

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

	public removeSelectedFiltered(type:string): void {

		this.activeNameFilters = this.activeNameFilters.filter(x => x.name !== type);

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

}
