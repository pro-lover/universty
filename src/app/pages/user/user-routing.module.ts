import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { MyProfilePage } from './pages/my-profile/my-profile.page';
import { OverviewPage } from './pages/overview/overview.page';

const routes: Routes = [
	{
		path: ROUTER_UTILS.config.user.profile.root,
		component: MyProfilePage,
		data: {
			title: 'My Profile | CMDBANNER',
			description:'',
			robots: 'noindex, nofollow',
			animation: 'MyProfilePage',
		}
	},
	{ 	path: ROUTER_UTILS.config.user.overview.root,
		component: OverviewPage,
		data: {
			title: 'My Profile | CMDBANNER',
			description:'',
			robots: 'noindex, nofollow',
			animation: 'OverviewPage',
		}
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class UserRoutingModule {}
