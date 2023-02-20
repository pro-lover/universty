import { BreakpointObserver } from '@angular/cdk/layout';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Account } from '@app/core/models';
import { AccountService, AlertService } from '@app/core/services';
import { HumanDateFormatPipe } from '@app/shared/pipes/humandate.pipe';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
	selector: 'app-card-profile',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './card.profile.component.html',
	styleUrls: ['./card.profile.component.scss'],
	providers: [
		HumanDateFormatPipe,
		{
			provide: STEPPER_GLOBAL_OPTIONS,
			useValue: {showError: true},
		},
	]
})
export class CardProfileComponent implements OnInit, OnDestroy {

	// will use the _destroy$ observable to control
	// fetching items from an observable
	_destroy$ = new Subject<boolean>();

	public path = ROUTER_UTILS.config.base;

	public account!: Account;

	constructor(
		private route: ActivatedRoute,
		private dialog: MatDialog,
		private location: Location,
		private accountService: AccountService,
		private alertService: AlertService,
		private _formBuilder: FormBuilder,
		public breakpointObserver: BreakpointObserver,
		public humanDateFormatPipe: HumanDateFormatPipe

	) {

		this.accountService.account
		.pipe(takeUntil(this._destroy$))
		.subscribe( (x:any) =>  {
			if( x === null ) {} else {

				this.account = x;
				//console.log('this.account', this.account);
			}
		});

	}

	ngOnInit() {

		this.initialise();

	}

	ngOnDestroy(): void {
		console.warn('CardProfile Component ngOnDestroy');
		this._destroy$.complete();
		this._destroy$.unsubscribe();
	}

	private initialise():void {
		console.log('Card Profile Component initialise');
	}

	public ListtrackByFn(index:number, item:any) {
		return index; // or item.id
	}

}

