export const ROUTER_UTILS = {
	config: {
		base: {
			home: '',
			about: 'about',
			header: 'header',
		},
		dashboard: {
			root: 'dashboard',
			notifications: 'notifications'
		},
		auth: {
			root: 'auth',
			signIn: 'login',
			signUp: 'register',
			verifyEmail: 'verify-email',
			forgotPassword: 'forgot-password',
			passwordReset: 'password-reset'
		},
		admin: {
			root: 'admin',
			accounts: {
				root: 'accounts',
				create: 'accounts/create',
				edit: 'accounts/edit/:id',
			},
			clients: {
				root: 'clients',
				create: 'clients/create',
				edit: 'clients/edit/:id',
			},

			brandKPIs: {
				root: 'brandKPIs',
				create: 'brandKPIs/create',
				edit: 'brandKPIs/edit/:id',
			},
			brands: {
				root: 'brands',
				create: 'brands/create',
				edit: 'brands/edit/:id',
			},
			teams: {
				root: 'teams',
				create: 'teams/create',
				edit: 'teams/edit/:id',
			},
			calendars: {
				root: 'calendars',
				create: 'calendars/create',
				edit: 'calendars/edit/:id',
			},
			briefs: {
				root: 'briefs',
				create: 'briefs/create',
				edit: 'briefs/edit/:id',
			},
			briefphases: {
				root: 'briefphases',
				create: 'briefphases/create',
				edit: 'briefphases/edit/:id',
			},
			jobtitles: {
				root: 'jobtitles',
				create: 'jobtitles/create',
				edit: 'jobtitles/edit/:id',
			},
			joblevels: {
				root: 'joblevels',
				create: 'joblevels/create',
				edit: 'joblevels/edit/:id',
			},
			creativeexecutions: {
				root: 'creativeexecutions',
				create: 'creativeexecutions/create',
				edit: 'creativeexecutions/edit/:id',
			},
			creatives: {
				root: 'creatives',
				create: 'creatives/create',
				edit: 'creatives/edit/:id',
			},
		},
		settings: {
			root: 'settings',
			account: 'account',
			appearance: 'appearance',
			billing: 'billing',
			blockedUsers: 'blocked-users',
			notifications: 'notifications',
			security: 'security',
			securityLog: 'security-log'
		},
		student: {
			root: 'Student',
			profile: {
				root: 'profile',
				//overview: 'overview',
				profile: 'username',
			},
			overview: {
				root: 'overview',
				overview: 'overview',

			},
			accounts: {
				root: 'accounts',
				create: 'accounts/create',
				edit: 'accounts/edit/:id',
			},

		},
		errorResponse: {
			notFound: '404',
		},
	},
};
