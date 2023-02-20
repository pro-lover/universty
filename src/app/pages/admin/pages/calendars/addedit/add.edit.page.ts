import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Account, Team, Role } from '@app/core/models';
import { AccountService, AlertService } from '@app/core/services';
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
export class CalendarAddEditPage implements OnInit, OnDestroy {

	constructor() {

	}
	ngOnInit() {
	}
	ngOnDestroy(): void {
	}

}
