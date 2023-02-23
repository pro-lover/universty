import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Account,BriefProgress, SchoolCertificate, Role,CreativeExecution,BriefPhase,SchoolSubject,Team } from '@app/core/models';
import { AccountService, AlertService } from '@app/core/services';
import * as SchoolCertificateActions from "@core/state/schoolCertificate/schoolCertificate.actions";
import * as SchoolCertificateSelectors from "@core/state/schoolCertificate/schoolCertificate.selector";
import * as CreativeExecutionActions from "@core/state/creativeExecution/creativeExecution.actions";
import * as CreativeExecutionSelectors from "@core/state/creativeExecution/creativeExecution.selector";

import * as BriefPhaseActions from "@core/state/briefPhase/briefPhase.actions";
import * as BriefPhaseSelectors from "@core/state/briefPhase/briefPhase.selector";

import * as SchoolSubjectActions from "@core/state/schoolSubject/schoolSubject.actions";
import * as SchoolSubjectSelectors from "@core/state/schoolSubject/schoolSubject.selector";

import * as TeamActions from "@core/state/team/team.actions";
import * as TeamSelectors from "@core/state/team/team.selector";

import * as Bapp_Utils from '@core/utils';
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';

@Component({
	templateUrl: './add.edit.page.html',
	styleUrls: ['./add.edit.page.scss'],
})
export class SchoolCertificateAddEditPage implements OnInit, OnDestroy {

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

	public dataCreativeExecutions$!: Observable<CreativeExecution[]>;
	public dataBriefPhases$!: Observable<BriefPhase[]>;
	public dataSchoolSubjects$!: Observable<SchoolSubject[]>;
	public dataTeams$!: Observable<Team[]>;

	Role = Role;
	BriefProgress = BriefProgress;
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
		this.dataCreativeExecutions$ = this.store.select(CreativeExecutionSelectors.selectCollection).pipe(takeUntil(this._destroy$));
		this.dataBriefPhases$ = this.store.select(BriefPhaseSelectors.selectCollection).pipe(takeUntil(this._destroy$));
		this.dataSchoolSubjects$ = this.store.select(SchoolSubjectSelectors.selectCollection).pipe(takeUntil(this._destroy$));
		this.dataTeams$ = this.store.select(TeamSelectors.selectCollection).pipe(takeUntil(this._destroy$));
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
					SchoolCertificateSelectors.selectById(
						parseInt(x)
					)
				);
				/**/
			});
			this.dataCreativeExecutions$
			.pipe(takeUntil(this._destroy$))
			.subscribe(
				(data:CreativeExecution[]) =>  {

					//console.warn('this.dataShirtSizes$', data);

					if( data === null || data.length <= 0 ) return;
				}
			);
			this.dataBriefPhases$
			.pipe(takeUntil(this._destroy$))
			.subscribe(
				(data:BriefPhase[]) =>  {

					//console.warn('this.dataShirtSizes$', data);

					if( data === null || data.length <= 0 ) return;
				}
			);
			this.dataSchoolSubjects$
			.pipe(takeUntil(this._destroy$))
			.subscribe(
				(data:SchoolSubject[]) =>  {

					console.warn('dataSchoolSubjects$: ', data);

					if( data === null || data.length <= 0 ) return;
				}
			);
			this.dataTeams$
			.pipe(takeUntil(this._destroy$))
			.subscribe(
				(data:Team[]) =>  {

					//console.warn('this.dataShirtSizes$', data);

					if( data === null || data.length <= 0 ) return;
				}
			);

		this.initialise();
	}

	ngOnDestroy(): void {
		console.warn('Add/Edit SchoolCertificate Page ngOnDestroy');
		this._destroy$.next(false);
		this._destroy$.complete();
	}

	private storeInit():void {

		this.store.dispatch(new SchoolCertificateActions.COLLECTION_LOAD_SCHOOLCERTIFICATES());
		this.store.dispatch(new CreativeExecutionActions.COLLECTION_LOAD_CREATIVEEXECUTIONS());
		this.store.dispatch(new BriefPhaseActions.COLLECTION_LOAD_BRIEFPHASES());
		this.store.dispatch(new SchoolSubjectActions.COLLECTION_LOAD_SCHOOLSUBJECTS());
		this.store.dispatch(new TeamActions.COLLECTION_LOAD_TEAMS());

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
				SchoolCertificateActions.SchoolCertificateActionTypes.MODEL_CreateSuccess
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
				SchoolCertificateActions.SchoolCertificateActionTypes.MODEL_UpdateSuccess
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
				SchoolCertificateActions.SchoolCertificateActionTypes.MODEL_CreateFailed,
				SchoolCertificateActions.SchoolCertificateActionTypes.MODEL_UpdateFailed
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
			offer: ['', Validators.required],
			objective: ['', Validators.required],
			targetAudience: ['', Validators.required],
			targetAudienceInsight: ['', Validators.required],
			targetAudienceOuttake: ['', Validators.required],
			singleMindedThought: ['', Validators.required],
			business: ['', Validators.required],
			brandTone: ['', Validators.required],
			budget: [1, Validators.required],
			deadlineTime: ['', Validators.required],
			deadlineDate: [new Date(), Validators.required],
			creativeexecutionId: [''],
			briefphaseId: ['', Validators.required],
			SchoolSubjectId: ['', Validators.required],
			teamId: ['', Validators.required],
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
			new SchoolCertificateActions.MODEL_CreateInitiated({ dataItem: {
				...this.form.value
			}})
		);
	}

	private updateRecord( data: SchoolCertificate ) {
		this.store.dispatch(
			new SchoolCertificateActions.MODEL_UpdateInitiated({ dataItem: {
				...data
				//id: this.id.toString(),
			}})
		);
	}

	public ListtrackByFn(index:number, item:any) {
		return index; // or item.id
	}
	public SchoolSubjectList($event:any,id:any) {

		console.log(" kpI : ", $event.checked +" : " + id);
	}

}
