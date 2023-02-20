
import { Component, ElementRef, EventEmitter, OnInit, Output,Input,Inject } from '@angular/core';
import { Router } from '@angular/router';
import {Role,Brief } from '@app/core/models';
import { AccountService,BriefService, AlertService } from '@app/core/services';
import { Observable, Subject } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Store } from "@ngrx/store";
import { Actions, ofType } from "@ngrx/effects";
import * as BriefSelectors from "@core/state/brief/brief.selector";
import * as BriefActions from "@core/state/brief/brief.actions";
import { map, startWith, takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';
import { FormControl } from '@angular/forms';

import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BriefProgress,CreativeExecution,BrandKPI,Team } from '@app/core/models';
import {ThemePalette} from '@angular/material/core';

export interface DialogData {
	selectedBriefId: number;
  }
  export interface ChipColor {
	name: string;
	color: ThemePalette;
  }

  /**
 * @title Dialog Overview
 */
@Component({
	selector: 'dialog-overview-example-dialog',
	templateUrl: './dialog-overview-example-dialog.page.html',
	styleUrls: ['./dialog-overview-example-dialog.page.scss'],
  })
  export class DialogOverviewExampleDialog {
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
	public primaryData!: any[];
	public dataBriefs$!: Observable<Brief[]>;
	public briefProgressVelue!: string;
	public numArray!: number;
	private brief!: Brief;
	public dataBriefProgress = [
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
	fontStyleControl = new FormControl('');
	fontStyle?: string;
	constructor(
		public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData,
		private store: Store,
		private route: ActivatedRoute,
	  ) {
		  this.storeInit();
		  this.dataBriefs$ = this.store.select(BriefSelectors.selectCollection).pipe(takeUntil(this._destroy$));
	  }
	  get f() { return this.form.controls; }
	ngOnInit() {
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

				this.dataItem$ = this.store.select(
					BriefSelectors.selectById(
						parseInt(x)
					)
				);
				/**/
			});

			this.dataBriefs$
			.pipe(takeUntil(this._destroy$))
			.subscribe(
				(data:Brief[]) =>  {
					this.primaryData = data;
					if( data === null || data.length <= 0 ) return;
				}
			);

		this.initialise();
	}
	ngOnDestroy(): void {
		console.warn('Add/Edit Brief Page ngOnDestroy h');
		this._destroy$.next(false);
		this._destroy$.complete();
	}

	private storeInit():void {

		this.store.dispatch(new BriefActions.COLLECTION_LOAD_BRIEFS());
	}

	onNoClick(): void {
	  this.dialogRef.close();
	}

	private initialise():void {

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

	public saveBriefProgress(id:any, name: string):void {
		console.log("saveBriefProgress");
		this.briefProgressVelue = name;
		/**/
		this.updateBriefProgress(this.data.selectedBriefId, {
			role: name
		});
		/**/
	}

	private updateBriefProgress( id: number, params: any ):void {
		console.log("updateBriefProgress");
		this.store.dispatch(
			new BriefActions.MODEL_UpdateProgressStatusInitiated({
				dataId: id,
				params: params
			})
		);

	}
  }
