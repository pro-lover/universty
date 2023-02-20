import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, OnInit, Output  } from '@angular/core';
import { Router } from '@angular/router';
import {
	Account,
	Role
} from '@app/core/models';
import {
	AccountService
} from '@app/core/services';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { AuthService } from '@pages/auth/services/auth.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, AfterViewInit {
	@Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
	@Output() toggleSidebarRightForMe: EventEmitter<any> = new EventEmitter();

	public Role = Role;
	public account: Account | undefined;
	public isLoggedIn$!: Observable<boolean>;

	public path = ROUTER_UTILS.config.base;

	constructor(
		private router: Router,
		private authService: AuthService,
		private accountService: AccountService,
		private elementRef: ElementRef
	) {
		this.accountService.account.subscribe( (x:any) =>  {

			if( x === null ) {} else {
				this.account = x;
				this.authService.isLoggedIn$.next(true);
			}
		});
	}

	ngOnInit(): void {
		this.isLoggedIn$ = this.authService.isLoggedIn$;
	}

	ngAfterViewInit() {
		console.log('');
		//console.log('this.account:', this.account);
		/* * /
		const dropdowns = this.elementRef.nativeElement.querySelectorAll('.dropdown-toggle')
		dropdowns.forEach((dd: any)=>{
			dd.addEventListener('click', function (e:any) {
				const el = dd.nextElementSibling
				el.style.display = el.style.display==='block'?'none':'block'
			});
		});
		/**/
	}

	public logout() {
		this.accountService.logout();

		const { root, signIn } = ROUTER_UTILS.config.auth;
		this.router.navigate(['/']);
	}
	toggleSidebar() {
		this.toggleSidebarForMe.emit();
	  }
	  toggleSidebarRight() {
		this.toggleSidebarRightForMe.emit();
	  }
	  getInitials(firstName:string, lastName:string) {
		return firstName[0].toUpperCase() + lastName[0].toUpperCase();
	  }
}
