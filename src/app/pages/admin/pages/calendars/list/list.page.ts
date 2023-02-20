import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { DatePipe, Location } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { DialogConfirmComponent, DialogRestoreComponent } from '@app/components';
import { Account, Team } from '@app/core/models';
import { AccountService, AlertService } from '@app/core/services';
import * as TeamActions from "@core/state/team/team.actions";
import * as TeamSelectors from "@core/state/team/team.selector";

import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import * as XLSX from 'xlsx';

@Component({
	templateUrl: './list.page.html',
	styleUrls: ['./list.page.scss'],
	providers: [
		DatePipe,
		
	]
})
export class CalendarListPage implements OnInit, OnDestroy {

	campaignOne: FormGroup;
	campaignTwo: FormGroup;
  
	constructor() {
	  const today = new Date();
	  const month = today.getMonth();
	  const year = today.getFullYear();
  
	  this.campaignOne = new FormGroup({
		start: new FormControl(new Date(year, month, 13)),
		end: new FormControl(new Date(year, month, 16)),
	  });
  
	  this.campaignTwo = new FormGroup({
		start: new FormControl(new Date(year, month, 15)),
		end: new FormControl(new Date(year, month, 19)),
	  });
	}
	ngOnInit() {
	}
	ngOnDestroy(): void {
	}
}
