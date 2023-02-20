import { NgModule } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from '@app/shared/guards';
import { Role } from '@core/models';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import {
    AdminListPage
} from './';
import { AccountsAddEditPage, AccountsListPage, BrandAddEditPage, BrandKPIAddEditPage, BrandKPIListPage, BrandListPage, BriefAddEditPage, BriefListPage, BriefPhaseAddEditPage, BriefPhaseListPage, CalendarAddEditPage, CalendarListPage, ClientAddEditPage, ClientListPage, CreativeAddEditPage, CreativeExecutionAddEditPage, CreativeExecutionListPage, CreativeListPage, JobLevelAddEditPage, JobLevelListPage, JobTitleAddEditPage, JobTitleListPage, TeamAddEditPage, TeamListPage } from './pages';


const AllRoles = [Role.Student, Role.Client, Role.Designer, Role.ProjectManager, Role.AccountService, Role.Admin];

const routes: Routes = [
	{
		path: '',
		component: AdminListPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'Admin',
			roles: AllRoles,
			animation: 'ListPage',
		},
	},
	///////////////////////
	// ACCOUNTS
	///////////////////////
	{
		path: ROUTER_UTILS.config.admin.accounts.root,
		component: AccountsListPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'Accounts',
			roles: [Role.Admin],
			animation: 'ListPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/accounts/admin.accounts.module')).AdminAccountsModule
	},
	{
		path: ROUTER_UTILS.config.admin.accounts.create,
		component: AccountsAddEditPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'Add Account',
			roles: [Role.Admin],
			animation: 'AddEditPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/accounts/admin.accounts.module')).AdminAccountsModule
	},
	{
		path: ROUTER_UTILS.config.admin.accounts.edit,
		component: AccountsAddEditPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'Edit Account',
			roles: AllRoles,
			animation: 'AddEditPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/accounts/admin.accounts.module')).AdminAccountsModule
	},


	///////////////////////
	// CLIENTS
	///////////////////////
	{
		path: ROUTER_UTILS.config.admin.clients.root,
		component: ClientListPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'Clients',
			roles: [Role.Admin],
			animation: 'ListPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/clients/admin.clients.module')).AdminClientsModule
	},
	{
		path: ROUTER_UTILS.config.admin.clients.create,
		component: ClientAddEditPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'Add Client',
			roles: [Role.Admin],
			animation: 'AddEditPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/clients/admin.clients.module')).AdminClientsModule
	},
	{
		path: ROUTER_UTILS.config.admin.clients.edit,
		component: ClientAddEditPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'Edit Client',
			roles: AllRoles,
			animation: 'AddEditPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/clients/admin.clients.module')).AdminClientsModule
	},

		///////////////////////
	// BRIEFPHASES
	///////////////////////
	{
		path: ROUTER_UTILS.config.admin.briefphases.root,
		component: BriefPhaseListPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'BriefPhases',
			roles: [Role.Admin],
			animation: 'ListPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/briefphases/admin.briefphases.module')).AdminBriefPhasesModule
	},
	{
		path: ROUTER_UTILS.config.admin.briefphases.create,
		component: BriefPhaseAddEditPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'Add BriefPhase',
			roles: [Role.Admin],
			animation: 'AddEditPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/briefphases/admin.briefphases.module')).AdminBriefPhasesModule
	},
	{
		path: ROUTER_UTILS.config.admin.briefphases.edit,
		component: BriefPhaseAddEditPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'Edit BriefPhase',
			roles: AllRoles,
			animation: 'AddEditPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/briefphases/admin.briefphases.module')).AdminBriefPhasesModule
	},
			///////////////////////
	// BRIEFS
	///////////////////////
	{
		path: ROUTER_UTILS.config.admin.briefs.root,
		component: BriefListPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'Briefs',
			roles: [Role.Admin,Role.Client],
			animation: 'ListPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/briefs/admin.briefs.module')).AdminBriefsModule
	},
	{
		path: ROUTER_UTILS.config.admin.briefs.create,
		component: BriefAddEditPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'Add Brief',
			roles: [Role.Admin],
			animation: 'AddEditPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/briefs/admin.briefs.module')).AdminBriefsModule
	},
	{
		path: ROUTER_UTILS.config.admin.briefs.edit,
		component: BriefAddEditPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'Edit Brief',
			roles: AllRoles,
			animation: 'AddEditPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/briefs/admin.briefs.module')).AdminBriefsModule
	},
		///////////////////////
	// BRANDKPI
	///////////////////////
	{
		path: ROUTER_UTILS.config.admin.brandKPIs.root,
		component: BrandKPIListPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'BrandKPIs',
			roles: [Role.Admin],
			animation: 'ListPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/brandKPIs/admin.brandKPIs.module')).AdminBrandKPIsModule
	},
	{
		path: ROUTER_UTILS.config.admin.brandKPIs.create,
		component: BrandKPIAddEditPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'Add BrandKPI',
			roles: [Role.Admin],
			animation: 'AddEditPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/brandKPIs/admin.brandKPIs.module')).AdminBrandKPIsModule
	},
	{
		path: ROUTER_UTILS.config.admin.brandKPIs.edit,
		component: BrandKPIAddEditPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'Edit BrandKPI',
			roles: AllRoles,
			animation: 'AddEditPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/brandKPIs/admin.brandKPIs.module')).AdminBrandKPIsModule
	},
	///////////////////////
	// BRAND
	///////////////////////
	{
		path: ROUTER_UTILS.config.admin.brands.root,
		component: BrandListPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'Brands',
			roles: [Role.Admin],
			animation: 'ListPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/brands/admin.brands.module')).AdminBrandsModule
	},
	{
		path: ROUTER_UTILS.config.admin.brands.create,
		component: BrandAddEditPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'Add Brand',
			roles: [Role.Admin],
			animation: 'AddEditPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/brands/admin.brands.module')).AdminBrandsModule
	},
	{
		path: ROUTER_UTILS.config.admin.brands.edit,
		component: BrandAddEditPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'Edit Brand',
			roles: AllRoles,
			animation: 'AddEditPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/brands/admin.brands.module')).AdminBrandsModule
	},
				///////////////////////
	// CreativeExecutionS
	///////////////////////
	{
		path: ROUTER_UTILS.config.admin.creativeexecutions.root,
		component: CreativeExecutionListPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'CreativeExecutions',
			roles: [Role.Admin],
			animation: 'ListPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/creativeexecutions/admin.creativeexecutions.module')).AdminCreativeExecutionsModule
	},
	{
		path: ROUTER_UTILS.config.admin.creativeexecutions.create,
		component: CreativeExecutionAddEditPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'Add CreativeExecution',
			roles: [Role.Admin],
			animation: 'AddEditPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/creativeexecutions/admin.creativeexecutions.module')).AdminCreativeExecutionsModule
	},
	{
		path: ROUTER_UTILS.config.admin.creativeexecutions.edit,
		component: CreativeExecutionAddEditPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'Edit CreativeExecution',
			roles: AllRoles,
			animation: 'AddEditPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/creativeexecutions/admin.creativeexecutions.module')).AdminCreativeExecutionsModule
	},
					///////////////////////
	// CreativeS
	///////////////////////
	{
		path: ROUTER_UTILS.config.admin.creatives.root,
		component: CreativeListPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'Creative',
			roles: [Role.Admin],
			animation: 'ListPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/creatives/admin.creatives.module')).AdminCreativesModule
	},
	{
		path: ROUTER_UTILS.config.admin.creatives.create,
		component: CreativeAddEditPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'Add Creative',
			roles: [Role.Admin],
			animation: 'AddEditPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/creatives/admin.creatives.module')).AdminCreativesModule
	},
	{
		path: ROUTER_UTILS.config.admin.creatives.edit,
		component: CreativeAddEditPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'Edit Creative',
			roles: AllRoles,
			animation: 'AddEditPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/creatives/admin.creatives.module')).AdminCreativesModule
	},
	///////////////////////
	// joblevels
	///////////////////////
	{
		path: ROUTER_UTILS.config.admin.joblevels.root,
		component: JobLevelListPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'Creative',
			roles: [Role.Admin],
			animation: 'ListPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/joblevels/admin.joblevels.module')).AdminJobLevelsModule
	},
	{
		path: ROUTER_UTILS.config.admin.joblevels.create,
		component: JobLevelAddEditPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'Add JobLevel',
			roles: [Role.Admin],
			animation: 'AddEditPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/joblevels/admin.joblevels.module')).AdminJobLevelsModule
	},
	{
		path: ROUTER_UTILS.config.admin.joblevels.edit,
		component: JobLevelAddEditPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'Edit JobLevel',
			roles: AllRoles,
			animation: 'AddEditPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/joblevels/admin.joblevels.module')).AdminJobLevelsModule
	},
							///////////////////////
	// jobTitles
	///////////////////////
	{
		path: ROUTER_UTILS.config.admin.jobtitles.root,
		component: JobTitleListPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'JobTitle',
			roles: [Role.Admin],
			animation: 'ListPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/jobtitles/admin.jobtitles.module')).AdminJobTitlesModule
	},
	{
		path: ROUTER_UTILS.config.admin.jobtitles.create,
		component: JobTitleAddEditPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'Add JobTitle',
			roles: [Role.Admin],
			animation: 'AddEditPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/jobtitles/admin.jobtitles.module')).AdminJobTitlesModule
	},
	{
		path: ROUTER_UTILS.config.admin.jobtitles.edit,
		component: JobTitleAddEditPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'Edit JobTitle',
			roles: AllRoles,
			animation: 'AddEditPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/jobtitles/admin.jobtitles.module')).AdminJobTitlesModule
	},
	///////////////////////
	// TEAMS
	///////////////////////
	{
		path: ROUTER_UTILS.config.admin.teams.root,
		component: TeamListPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'Team',
			roles: [Role.Admin],
			animation: 'ListPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/teams/admin.teams.module')).AdminTeamsModule
	},
	{
		path: ROUTER_UTILS.config.admin.teams.create,
		component: TeamAddEditPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'Add Team',
			roles: [Role.Admin],
			animation: 'AddEditPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/teams/admin.teams.module')).AdminTeamsModule
	},
	{
		path: ROUTER_UTILS.config.admin.teams.edit,
		component: TeamAddEditPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'Edit Team',
			roles: AllRoles,
			animation: 'AddEditPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/teams/admin.teams.module')).AdminTeamsModule
	},
		///////////////////////
	// CALENDARS
	///////////////////////
	{
		path: ROUTER_UTILS.config.admin.calendars.root,
		component: CalendarListPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'Calendar',
			roles: [Role.Admin],
			animation: 'ListPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/calendars/admin.calendars.module')).AdminCalendarsModule
	},
	{
		path: ROUTER_UTILS.config.admin.calendars.create,
		component: CalendarAddEditPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'Add Calendar',
			roles: [Role.Admin],
			animation: 'AddEditPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/calendars/admin.calendars.module')).AdminCalendarsModule
	},
	{
		path: ROUTER_UTILS.config.admin.calendars.edit,
		component: CalendarAddEditPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'Edit Calendar',
			roles: AllRoles,
			animation: 'AddEditPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/calendars/admin.calendars.module')).AdminCalendarsModule
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes),MatButtonToggleModule],
	exports: [RouterModule],
})
export class AdminRoutingModule {}
