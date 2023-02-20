import { Location } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
	Account,
	Role
} from '@app/core/models';
import { AccountService } from '@core/services';
import { ThemeList, ThemeService } from '@core/services/theme';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { AuthService } from '@pages/auth/services/auth.service';
import { Observable } from 'rxjs';


@Component({
	selector: 'app-header-offline',
	templateUrl: './header.page.html',
	styleUrls: ['./header.page.scss'],
})
export class HeaderPage implements OnInit {
	path = ROUTER_UTILS.config;
	theme = ThemeList;

	public Role = Role;
	public account: Account | undefined;
	public isLoggedIn$!: Observable<boolean>;

	constructor(
		private dialog: MatDialog,
		private authService: AuthService,
		private location: Location,
		private themeService: ThemeService,
		private accountService: AccountService,
	) {
		this.accountService.account.subscribe( (x:any) =>  {
			if( x === null ) {} else {

				this.authService.isLoggedIn$.next(true);

				this.account = x;
			}
		});
	}

	ngOnInit(): void {
		this.isLoggedIn$ = this.authService.isLoggedIn$;
	}

	public onClickChangeTheme(theme: ThemeList): void {
		this.themeService.setTheme(theme);
	}
}

