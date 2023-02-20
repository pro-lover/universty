import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, OnInit,Output } from '@angular/core';
import { Router } from '@angular/router';
import {
	Account
} from '@app/core/models';
import {
	AccountService
} from '@app/core/services';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { AuthService } from '@pages/auth/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent implements OnInit, AfterViewInit{
	@Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
	@Output() toggleSidebarRightForMe: EventEmitter<any> = new EventEmitter();

  public account: Account | undefined;
	public isLoggedIn$!: Observable<boolean>;

	public path = ROUTER_UTILS.config.base;

	constructor(
		private router: Router,
		private authService: AuthService,
		private accountService: AccountService
	) {
		this.accountService.account.subscribe( (x:any) =>  {

			if( x === null ) {} else {
				this.account = x;
				this.authService.isLoggedIn$.next(true);
			}
		});
	}
	ngAfterViewInit() {
		console.log('');
	}
	public logout() {
		this.accountService.logout();

		const { root, signIn } = ROUTER_UTILS.config.auth;
		this.router.navigate(['/', root, signIn]);
	}
	toggleSidebar() {
		this.toggleSidebarForMe.emit();
	  }
	  toggleSidebarRight() {
		this.toggleSidebarRightForMe.emit();
	  }
  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

}
