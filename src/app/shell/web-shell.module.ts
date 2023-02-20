import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
	AuthGuard, LoginActivateGuard, NoAuthGuard
} from '@app/shared/guards';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { FooterModule } from '@app/shell/ui/footer/footer.module';
import { HeaderModule } from '@app/shell/ui/header/header.module';
import { LayoutModule } from '@app/shell/ui/layout/layout.module';
import { NotFoundModule } from '@app/shell/ui/not-found/not-found.module';
import { NotFoundPage } from '@app/shell/ui/not-found/not-found.page';

const APP_ROUTES: Routes = [

	{
		path: ROUTER_UTILS.config.base.home,
		loadChildren: async () => (await import('@pages/home/home.module')).HomeModule,
		canLoad: [NoAuthGuard],
		canActivate: [LoginActivateGuard],
		data: {
			title: 'Welcome | University',
			description:
				'',
			robots: 'noindex, nofollow',
			animation: 'HomePage',
		}
	},
	{
		path: ROUTER_UTILS.config.auth.root,
		loadChildren: async () => (await import('@pages/auth/auth.module')).AuthModule,
		canLoad: [NoAuthGuard],
		data: {
			title: 'Login | University',
			description:
				'',
			robots: 'noindex, nofollow',
			animation: 'AuthPage',
		}
	},
	{
		path: ROUTER_UTILS.config.admin.root,
		loadChildren: async () => (await import('@pages/admin/admin.module')).AdminModule,
		canLoad: [AuthGuard],
		data: {
			title: 'Admin | University',
			description:
				'',
			robots: 'noindex, nofollow',
			animation: 'AdminPage',
		}
	},
	{
		path: ROUTER_UTILS.config.dashboard.root,
		loadChildren: async () => (await import('@pages/dashboard/dashboard.module')).DashboardModule,
		canLoad: [AuthGuard],
		data: {
			title: 'Dashboard | University',
			description:
				'',
			robots: 'noindex, nofollow',
			animation: 'DashboardPage',
		}
	},
	{
		path: '**',
		//redirectTo: '/404',
		/**/
		loadChildren: async () => (await import('@app/shell/ui/not-found/not-found.module')).NotFoundModule,
		component: NotFoundPage,
		data: {
			title: '404 | University',
			description:
				'',
			robots: 'noindex, nofollow',
			animation: 'NotFoundPage',
		}
		/**/
	}
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forRoot(APP_ROUTES),
		FooterModule,
		HeaderModule,
		LayoutModule,
		NotFoundModule,
	],
	exports: [
		RouterModule,
		FooterModule,
		HeaderModule,
		LayoutModule,
		NotFoundModule,
	],
})
export class WebShellModule {}
