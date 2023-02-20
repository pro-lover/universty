
import { Component,Inject,OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Brief } from '@app/core/models';
import { BriefService } from '@app/core/services';
import * as BriefActions from "@core/state/brief/brief.actions";
import * as BriefSelectors from "@core/state/brief/brief.selector";
import { Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { Store } from "@ngrx/store";
import { initial } from 'underscore';

export interface DialogData {
	selectedBriefId: string;
  }
    /**
 * @title Dialog Overview
 */
@Component({
	selector: 'dialog-view.page',
	templateUrl: './dialog-view.page.html',
	styleUrls: ['./dialog-view.page.scss'],
  })
  export class DialogView {

	public dataView$!: Observable<Brief[]>;
	public primaryData!: any[];
	public brief!: Brief;
	private _destroy$ = new Subject<boolean>();

	constructor(
		public dialogRef: MatDialogRef<DialogData>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData,
		private briefService: BriefService,
		private store: Store,
	) 
	{
		this.briefService.brief
			.pipe(takeUntil(this._destroy$))
			.subscribe((x:any) => this.brief = x);

		this.dataView$ = this.store.select(BriefSelectors.selectCollection);
	
	}
	ngOnInit() {

		this.dataView$
			.pipe(takeUntil(this._destroy$))
			.subscribe((dataview:Brief[]) => this.primaryData =dataview);
			
	}
	private initialise( data:Brief[]): void{
		this.primaryData = data;

	}
  }
