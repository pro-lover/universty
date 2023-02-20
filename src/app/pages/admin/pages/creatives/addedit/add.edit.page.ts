import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Account, Creative, Role,JobTitle,JobLevel,Team } from '@app/core/models';
import { AccountService, AlertService } from '@app/core/services';
import * as CreativeActions from "@core/state/creative/creative.actions";
import * as CreativeSelectors from "@core/state/creative/creative.selector";

import * as TeamActions from "@core/state/team/team.actions";
import * as TeamSelectors from "@core/state/team/team.selector";

import * as AccountActions from "@core/state/account/accounts.actions";
import * as AccountSelectors from "@core/state/account/accounts.selector";

import * as JobLevelActions from "@core/state/jobLevel/jobLevel.actions";
import * as JobLevelSelectors from "@core/state/jobLevel/jobLevel.selector";

import * as JobTitleActions from "@core/state/jobTitle/jobTitle.actions";
import * as JobTitleSelectors from "@core/state/jobTitle/jobTitle.selector";


import * as Bapp_Utils from '@core/utils';
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';

@Component({
	templateUrl: './add.edit.page.html',
	styleUrls: ['./add.edit.page.scss'],
})
export class CreativeAddEditPage implements OnInit, OnDestroy {

	// will use the _destroy$ observable to control
	// fetching items from an observable
	private _destroy$ = new Subject<boolean>();

	// data fields
	private dataItem$!:Observable<any>;
	private dataItemId$!:Observable<string>;

	public dataTeams$!: Observable<Team[]>;
	public dataJobLevels$!: Observable<JobLevel[]>;
	public dataJobTitles$!: Observable<JobTitle[]>;
	public dataAccounts$!: Observable<Account[]>;

	public form!: FormGroup;
	public id!: string;
	public isAddMode!: boolean;
	public loading = false;
	public submitted = false;

	private Role = Role;
	private account!: Account;

	constructor(
		private store: Store,
		private actions$: Actions<any>,
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private location: Location,
		private accountService: AccountService,
		private alertService: AlertService
	) {

		this.prepForm();
		this.storeInit();

		this.account = this.accountService.accountValue;
		this.dataTeams$ = this.store.select(TeamSelectors.selectCollection).pipe(takeUntil(this._destroy$));
		this.dataJobLevels$= this.store.select(JobLevelSelectors.selectCollection).pipe(takeUntil(this._destroy$));
		this.dataJobTitles$ = this.store.select(JobTitleSelectors.selectCollection).pipe(takeUntil(this._destroy$));
		this.dataAccounts$ = this.store.select(AccountSelectors.selectCollection).pipe(takeUntil(this._destroy$));
	}

	// convenience getter for easy access to form fields
	get f() { return this.form.controls; }

	ngOnInit() {

		this.prepPageData();

		this.dataItemId$ = this.route.params
			.pipe(takeUntil(this._destroy$))
			.pipe(
				map((params) => params['id'])
			);

		this.dataItemId$
			.pipe(takeUntil(this._destroy$))
			.subscribe( (x) => {

				this.id = x;
				this.isAddMode = !this.id;
				//this.isAddModeSubject.next(!this.id);
				/**/
				this.dataItem$ = this.store.select(
					CreativeSelectors.selectById(
						parseInt(x)
					)
				);
				/**/
			});
			this.dataTeams$
			.pipe(takeUntil(this._destroy$))
			.subscribe(
				(data:Team[]) =>  {

					//console.warn('this.dataShirtSizes$', data);

					if( data === null || data.length <= 0 ) return;
				}
			);
			this.dataJobLevels$
			.pipe(takeUntil(this._destroy$))
			.subscribe(
				(data:JobLevel[]) =>  {

					//console.warn('this.dataShirtSizes$', data);

					if( data === null || data.length <= 0 ) return;
				}
			);
			this.dataJobTitles$
			.pipe(takeUntil(this._destroy$))
			.subscribe(
				(data:JobTitle[]) =>  {

					//console.warn('this.dataShirtSizes$', data);

					if( data === null || data.length <= 0 ) return;
				}
			);
			this.dataAccounts$
			.pipe(takeUntil(this._destroy$))
			.subscribe(
				(data:Account[]) =>  {

					//console.warn('this.dataShirtSizes$', data);

					if( data === null || data.length <= 0 ) return;
				}
			);

		this.initialise();
	}

	ngOnDestroy(): void {
		console.warn('Add/Edit Creative Page ngOnDestroy');
		this._destroy$.next(false);
		this._destroy$.complete();
	}

	private storeInit():void {

		this.store.dispatch(new CreativeActions.COLLECTION_LOAD_CREATIVES());
		this.store.dispatch(new TeamActions.COLLECTION_LOAD_TEAMS());
		this.store.dispatch(new JobLevelActions.COLLECTION_LOAD_JOBLEVELS());
		this.store.dispatch(new JobTitleActions.COLLECTION_LOAD_JOBTITLES());
		this.store.dispatch(new AccountActions.COLLECTION_LOAD_ACCOUNTS());
	}

	public onSubmit():void {
		this.submitted = true;

		// reset alerts on submit
		this.alertService.clear();

		// stop here if form is invalid
		if (this.form.invalid) {
			this.alertService.error('Please ensure all the fields are completed correctly.');
			console.error('Error Saving Model:', this.form.value);
			return;
		}

		this.loading = true;
		if (this.isAddMode) {
			this.createRecord();
		} else {
			this.updateRecord( this.form.value );
		}
	}

	private initialise():void {

		this.uiStateInfo();

		this.dataItem$
			.pipe(takeUntil(this._destroy$))
			.subscribe( (x) => {
				if( x === undefined ) {
					return;
				}
				//x.description = Bapp_Utils.noSpecialCharactersandSpace(x.description);
				this.form.patchValue(x);
			});
	}

	private uiStateInfo():void {

		// CREATE
		this.actions$
		.pipe(
			ofType(
				CreativeActions.CreativeActionTypes.MODEL_CreateSuccess
			)
		)
		.pipe(takeUntil(this._destroy$))
		.subscribe({
			next: () => {
				this.alertService.success('Record Created successfully.', { keepAfterRouteChange: true });
				this.loading = false;
				this.router.navigate(['../'], { relativeTo: this.route });
			},
			error: error => {
				this.alertService.error(error);
				this.loading = false;
			}
		});

		// UPDATE
		this.actions$
		.pipe(
			ofType(
				CreativeActions.CreativeActionTypes.MODEL_UpdateSuccess
			)
		)
		.pipe(takeUntil(this._destroy$))
		.subscribe({
			next: () => {
				this.alertService.success('Update successful', { keepAfterRouteChange: true });
				this.loading = false;
				this.router.navigate(['../../'], { relativeTo: this.route });
			},
			error: error => {
				this.alertService.error(error);
				this.loading = false;
			}
		});

		// FAILURE
		this.actions$
		.pipe(
			ofType(
				CreativeActions.CreativeActionTypes.MODEL_CreateFailed,
				CreativeActions.CreativeActionTypes.MODEL_UpdateFailed
			)
		)
		.pipe(takeUntil(this._destroy$))
		.subscribe({
			next: (data) => {
				this.alertService.error(data.payload.error, { keepAfterRouteChange: true });
				this.loading = false;
			},
			error: error => {
				this.alertService.error(error);
				this.loading = false;
			}
		});
	}

	private prepPageData():void {

		//this.dataAnimationTypeView$ = this.store.select(AnimationtypeSelectors.selectCollection).pipe(takeUntil(this._destroy$));
		//this.dataEasingTypeView$ = this.store.select(EasingtypeSelectors.selectCollection).pipe(takeUntil(this._destroy$));

	}

	private prepForm():void {

		this.form = this.formBuilder.group({
			id: [''],
			description: ['', Validators.required],
			accountId: ['', Validators.required],
			jobtitleId: ['', Validators.required],
			joblevelId: ['', Validators.required],
			teamId: ['', Validators.required],
		});

this.prepFormListeners();
	}

	private prepFormListeners():void {

		this.f['description']
		.valueChanges
		.pipe(takeUntil(this._destroy$))
		.pipe(distinctUntilChanged())
		.subscribe((value) => {
			if( value ) {
				// https://stackoverflow.com/questions/47821809/rangeerror-maximum-call-stack-size-exceeded-when-using-valuechanges-subscribe
				this.f['description'].patchValue(Bapp_Utils.noSpecialCharactersandSpace(value), {emitEvent: false});
			}
		});
		this.f['accountId']
		.valueChanges
		.pipe(takeUntil(this._destroy$))
		.pipe(distinctUntilChanged())
		.subscribe((value) => {
			if( value ) {
				// https://stackoverflow.com/questions/47821809/rangeerror-maximum-call-stack-size-exceeded-when-using-valuechanges-subscribe
				this.f['accountId'].patchValue('N/A', {emitEvent: false});
			}
		});
		this.f['jobtitleId']
		.valueChanges
		.pipe(takeUntil(this._destroy$))
		.pipe(distinctUntilChanged())
		.subscribe((value) => {
			if( value ) {
				// https://stackoverflow.com/questions/47821809/rangeerror-maximum-call-stack-size-exceeded-when-using-valuechanges-subscribe
				this.f['jobtitleId'].patchValue('N/A', {emitEvent: false});
			}
		});
		this.f['joblevelId']
		.valueChanges
		.pipe(takeUntil(this._destroy$))
		.pipe(distinctUntilChanged())
		.subscribe((value) => {
			if( value ) {
				// https://stackoverflow.com/questions/47821809/rangeerror-maximum-call-stack-size-exceeded-when-using-valuechanges-subscribe
				this.f['joblevelId'].patchValue('N/A', {emitEvent: false});
			}
		});
	}


	public back(): void {
		this.location.back();
	}

	public help(): void {

		//this.introJS.refresh();

		//this.introJS.addHints();

		//this.introJS.showHints();

		//this.introJS.start();

		this.alertService.info('Help/Onboarding Feature still in WIP.', { keepAfterRouteChange: true });
	}

	private createRecord() {
		this.store.dispatch(
			new CreativeActions.MODEL_CreateInitiated({ dataItem: {
				...this.form.value
			}})
		);
	}

	private updateRecord( data: Creative ) {
		this.store.dispatch(
			new CreativeActions.MODEL_UpdateInitiated({ dataItem: {
				...data
				//id: this.id.toString(),
			}})
		);
	}

	public ListtrackByFn(index:number, item:any) {
		return index; // or item.id
	}

}
