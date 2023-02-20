import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Account, JobLevel, Role } from '@app/core/models';
import { AccountService, AlertService } from '@app/core/services';
import * as JobLevelActions from "@core/state/jobLevel/jobLevel.actions";
import * as JobLevelSelectors from "@core/state/jobLevel/jobLevel.selector";

import * as Bapp_Utils from '@core/utils';
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';

@Component({
	templateUrl: './add.edit.page.html',
	styleUrls: ['./add.edit.page.scss'],
})
export class JobLevelAddEditPage implements OnInit, OnDestroy {

	// will use the _destroy$ observable to control
	// fetching items from an observable
	private _destroy$ = new Subject<boolean>();

	// data fields
	private dataItem$!:Observable<any>;
	private dataItemId$!:Observable<string>;

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
					JobLevelSelectors.selectById(
						parseInt(x)
					)
				);
				/**/
			});

		this.initialise();
	}

	ngOnDestroy(): void {
		console.warn('Add/Edit JobLevel Page ngOnDestroy');
		this._destroy$.next(false);
		this._destroy$.complete();
	}

	private storeInit():void {

		this.store.dispatch(new JobLevelActions.COLLECTION_LOAD_JOBLEVELS());

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
				//x.name = Bapp_Utils.noSpecialCharactersandSpace(x.name);
				this.form.patchValue(x);
			});
	}

	private uiStateInfo():void {

		// CREATE
		this.actions$
		.pipe(
			ofType(
				JobLevelActions.JobLevelActionTypes.MODEL_CreateSuccess
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
				JobLevelActions.JobLevelActionTypes.MODEL_UpdateSuccess
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
				JobLevelActions.JobLevelActionTypes.MODEL_CreateFailed,
				JobLevelActions.JobLevelActionTypes.MODEL_UpdateFailed
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
			name: ['', Validators.required],
			description: ['', Validators.required],
		});

		//this.prepFormListeners();

	}

	private prepFormListeners():void {

		this.f['name']
		.valueChanges
		.pipe(takeUntil(this._destroy$))
		.pipe(distinctUntilChanged())
		//.pipe(distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)))
		.subscribe((value) => {
			if( value ) {
				// https://stackoverflow.com/questions/47821809/rangeerror-maximum-call-stack-size-exceeded-when-using-valuechanges-subscribe
				this.f['name'].patchValue(Bapp_Utils.noSpecialCharactersandSpace(value), {emitEvent: false});
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
			new JobLevelActions.MODEL_CreateInitiated({ dataItem: {
				...this.form.value
			}})
		);
	}

	private updateRecord( data: JobLevel ) {
		this.store.dispatch(
			new JobLevelActions.MODEL_UpdateInitiated({ dataItem: {
				...data
				//id: this.id.toString(),
			}})
		);
	}

	public ListtrackByFn(index:number, item:any) {
		return index; // or item.id
	}

}
