import { BreakpointObserver } from '@angular/cdk/layout';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ChildrenOutletContexts } from '@angular/router';
import { Account } from '@app/core/models';
import { AccountService, AlertService } from '@app/core/services';
import { slideInAnimation } from '@app/shared/animations/animations';
import * as AccountActions from "@core/state/account/accounts.actions";
import * as AccountSelectors from "@core/state/account/accounts.selector";
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { Actions } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';



@Component({
	selector: 'app-card-users',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './card.users.component.html',
	styleUrls: ['./card.users.component.scss'],
	providers: [
		{
			provide: STEPPER_GLOBAL_OPTIONS,
			useValue: {showError: true},
		},
	],
	animations: [
		slideInAnimation
	]
})
export class CardUsersComponent implements OnInit, OnDestroy {

	// will use the _destroy$ observable to control
	// fetching items from an observable
	_destroy$ = new Subject<boolean>();

	public path = ROUTER_UTILS.config.base;

	public account!: Account;

	public dataView$!: Observable<Account[]>;
	//private dataDesigner!: Account[];
	//private dataDeveloper!: Account[];

	@Input() statModel!: string;
	@Input() statModelTitle!: string;
	@Input() statIcon!: string;

	/** /

	// FILTERS
	public statusFilterValue: FormControl;
	public dateFilterValue: FormControl;
	public topicFilterValue: FormControl;
	public specialisationFilterValue: FormControl;

	// FILTER DATA
	public dataRaceView$!: Observable<Race[]>;
	public dataGenderView$!: Observable<Gender[]>;
	public dataPositionView$!: Observable<Position[]>;
	//public dataInstitutionView$!: Observable<Institution[]>;
	public dataQualificationView$!: Observable<Qualification[]>;
	public dataSpecialisationView$!: Observable<Specialisation[]>;
	/**/


	/**/
	// MatPaginator Inputs for variations pagination
	public pageLength = 0;
	public pageSize = 10;
	public currentPage = 0;
	public pageSizeOptions: number[] = [10, 20, 50, 100];
	public sortedData!: any[];
	public numberOfVer!: any[];

	constructor(
		private route: ActivatedRoute,
		private store: Store,
		private actions$: Actions<any>,
		private dialog: MatDialog,
		private location: Location,
		private accountService: AccountService,
		private alertService: AlertService,
		private _formBuilder: FormBuilder,
		public breakpointObserver: BreakpointObserver,
		private contexts: ChildrenOutletContexts

	) {

		/** /
		this.statusFilterValue = new FormControl('all');
		this.dateFilterValue = new FormControl('all');
		this.topicFilterValue = new FormControl('all');
		this.specialisationFilterValue = new FormControl(['all']);
		/**/

		this.storeInit();

		this.accountService.account
			.pipe(takeUntil(this._destroy$))
			.subscribe((x:any) => this.account = x);

		this.dataView$ = this.store.select(AccountSelectors.selectCollection).pipe(takeUntil(this._destroy$));
	}


	ngOnInit() {

		//this.uiStateInfo();

		this.storeInit();

		this.initialise();

	}

	ngOnDestroy(): void {
		console.warn('Card Users Component ngOnDestroy');
		this._destroy$.complete();
		this._destroy$.unsubscribe();
	}

	private storeInit():void {

		this.store.dispatch(new AccountActions.appComponentInitialized());

		/** /
		this.store.dispatch(new QualificationActions.appComponentInitialized());
		this.store.dispatch(new SpecialisationActions.appComponentInitialized());
		this.store.dispatch(new RaceActions.appComponentInitialized());
		this.store.dispatch(new GenderActions.appComponentInitialized());
		this.store.dispatch(new PositionActions.appComponentInitialized());
		/**/

	}

	private initialise():void {
		console.log('Card Users Component initialise');

		this.dataView$
			.pipe(takeUntil(this._destroy$))
			.subscribe({
				next: (accounts:Account[]) => {
					//console.log('Accounts:', accounts);
					//this.initialiseFilterData();

				},
				error: error => {
					console.error('dataView$ error:', error);
				}
			});


	}

	/** /
	private initialiseFilterData():void {

		this.dataRaceView$ = this.store.select(RaceSelectors.selectCollection).pipe(takeUntil(this._destroy$));
		this.dataGenderView$ = this.store.select(GenderSelectors.selectCollection).pipe(takeUntil(this._destroy$));
		this.dataPositionView$ = this.store.select(PositionSelectors.selectCollection).pipe(takeUntil(this._destroy$));
		//this.dataInstitutionView$ = this.store.select(InstitutionSelectors.selectCollection).pipe(takeUntil(this._destroy$));
		this.dataQualificationView$ = this.store.select(QualificationSelectors.selectCollection).pipe(takeUntil(this._destroy$));
		this.dataSpecialisationView$ = this.store.select(SpecialisationSelectors.selectCollection).pipe(takeUntil(this._destroy$));
	}
	/**/

	public ListtrackByFn(index:number, item:any) {
		return index; // or item.id
	}

	public getRouteAnimationData() {
		//console.log('getRouteAnimationData: ', this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation']);
		return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
	}

}

