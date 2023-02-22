import {
	Component, OnDestroy, OnInit
} from '@angular/core';
import {
	Account,Brand,Client,SchoolSubject,Brief,BriefPhase,Creative,CreativeExecution,JobLevel,JobTitle,Team,
	Role
} from '@app/core/models';
import { Router } from '@angular/router';
import { AccountService, ClientService,BrandService ,SchoolSubjectService,BriefPhaseService,BriefService,CreativeExecutionService,CreativeService,JobLevelService,JobTitleService,TeamService,
} from '@core/services';
import { ThemeList, ThemeService } from '@core/services/theme';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { AuthService } from '@pages/auth/services/auth.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import {ThemePalette} from '@angular/material/core';

@Component({
	selector: 'app-dashboard-component',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {

	// will use the _destroy$ observable to control
	// fetching items from an observable
	private _destroy$ = new Subject<boolean>();

	path = ROUTER_UTILS.config;
	theme = ThemeList;
	myaccount!: Account;
	myjoblevel!: JobLevel;
	myjobtitle!: JobTitle;
	myteam!: Team;
	myclient!: Client;
	myschoolsubject!: SchoolSubject;
	mybrand!: Brand;
	mybrief!: Brief;
	mybriefphase!: BriefPhase;
	mycreative!: Creative;
	mycreactiveex!: CreativeExecution;
	public valueData!: number;
	color: ThemePalette = 'primary';
	mode: ProgressSpinnerMode = 'determinate';
	value = 0;
	panelOpenState = false;

	private allData!: any[];
	private allClientData!: any[];private allBriefData!: any[];private allBriefPhaseData!: any[];private allSchoolSubjectData!: any[];
	private allJobTitleData!: any[];private allJobLevelData!: any[];private allCreativeData!: any[];private allCreativeEData!: any[];
	private allTeamData!: any[];private allBrandData!: any[];

	public clientData!: any[];public briefData!: any[];public briefPhaseData!: any[];public schoolsubjectData!: any[];
	public jobTitleData!: any[];public jobLevelData!: any[];public creativeData!: any[];public creativeEData!: any[];
	public teamData!: any[];public brandData!: any[];

	public Role = Role;
	public account: Account | undefined;
	public isLoggedIn$!: Observable<boolean>;
	public primaryData!: any[];


	private refreshCarousel: BehaviorSubject<boolean>;
	public refreshCarousel$: Observable<boolean>;

	constructor(
		private router: Router,
		private authService: AuthService,
		private themeService: ThemeService,
		private accountService: AccountService,
		private clientService: ClientService,
		private schoolSubjectService: SchoolSubjectService,
		private brandService: BrandService,
		private briefPhaseService: BriefPhaseService,
		private briefService: BriefService,
		private jobLevelService: JobLevelService,
		private jobTitleService: JobTitleService,
		private teamService: TeamService,
		private creativeExecutionService: CreativeExecutionService,
		private creativeService: CreativeService,


	) {

		this.refreshCarousel = new BehaviorSubject<boolean>(false);
		this.refreshCarousel$ = this.refreshCarousel.asObservable();

		this.accountService.account
		.pipe(takeUntil(this._destroy$))
		.subscribe((x:any) => this.myaccount = x );
		this.accountService.account.subscribe( (x:any) =>  {
			console.log("login");
			console.log(x);
			if( x === null ) {} else {
				this.account = x;
				this.authService.isLoggedIn$.next(true);
			}
		});

		this.clientService.client
		.pipe(takeUntil(this._destroy$))
		.subscribe((x:any) => this.myclient = x);

		this.schoolSubjectService.schoolSubject
		.pipe(takeUntil(this._destroy$))
		.subscribe((x:any) => this.myschoolsubject = x);

		this.brandService.brand
		.pipe(takeUntil(this._destroy$))
		.subscribe((x:any) => this.mybrand = x);

		this.briefPhaseService.briefPhase
		.pipe(takeUntil(this._destroy$))
		.subscribe((x:any) => this.mybriefphase = x);

		this.briefService.brief
		.pipe(takeUntil(this._destroy$))
		.subscribe((x:any) => this.mybrief = x);

		this.creativeExecutionService.creativeExecution
		.pipe(takeUntil(this._destroy$))
		.subscribe((x:any) => this.mycreactiveex = x);

		this.creativeService.creative
		.pipe(takeUntil(this._destroy$))
		.subscribe((x:any) => this.mycreative = x);

		this.jobLevelService.jobLevel
		.pipe(takeUntil(this._destroy$))
		.subscribe((x:any) => this.myjoblevel = x);

		this.jobTitleService.jobTitle
		.pipe(takeUntil(this._destroy$))
		.subscribe((x:any) => this.myjobtitle = x);

		this.teamService.team
		.pipe(takeUntil(this._destroy$))
		.subscribe((x:any) => this.myteam = x);

	}

	ngOnInit(): void {
		this.isLoggedIn$ = this.authService.isLoggedIn$;
		this.accountService.getAll().pipe(first()).pipe(takeUntil(this._destroy$)).subscribe((accounts:Account[]) => {this.allData = accounts; if( accounts !== undefined && accounts.length > 0 ) {this.initialise(accounts);}});
		this.briefService.getAll().pipe(first()).pipe(takeUntil(this._destroy$)).subscribe((briefs:Brief[]) => {this.allBriefData = briefs;if( briefs !== undefined && briefs.length > 0 ) {this.initialiseBrief(briefs);}});
		this.schoolSubjectService.getAll().pipe(first()).pipe(takeUntil(this._destroy$)).subscribe((schoolsubjects:SchoolSubject[]) => {this.allSchoolSubjectData = schoolsubjects; if( schoolsubjects !== undefined && schoolsubjects.length > 0 ) {this.initialiseSchoolSubject(schoolsubjects);}});
		this.brandService.getAll().pipe(first()).pipe(takeUntil(this._destroy$)).subscribe((brands:Brand[]) => {this.allBrandData = brands; if( brands !== undefined && brands.length > 0 ) {this.initialiseBrand(brands);}});
		this.briefPhaseService.getAll().pipe(first()).pipe(takeUntil(this._destroy$)).subscribe((briefPhases:BriefPhase[]) => {this.allBriefPhaseData = briefPhases; if( briefPhases !== undefined && briefPhases.length > 0 ) {this.initialiseBriefPhase(briefPhases);}});
		this.creativeExecutionService.getAll().pipe(first()).pipe(takeUntil(this._destroy$)).subscribe((creativeExecutions:CreativeExecution[]) => {this.allCreativeEData = creativeExecutions; if( creativeExecutions !== undefined && creativeExecutions.length > 0 ) {this.initialisecreativeExecutio(creativeExecutions);}});
		this.creativeService.getAll().pipe(first()).pipe(takeUntil(this._destroy$)).subscribe((creatives:Creative[]) => {this.allCreativeData = creatives; if( creatives !== undefined && creatives.length > 0 ) {this.initialiseCreative(creatives);}});
		this.jobLevelService.getAll().pipe(first()).pipe(takeUntil(this._destroy$)).subscribe((jobLevels:JobLevel[]) => {this.allJobLevelData = jobLevels; if( jobLevels !== undefined && jobLevels.length > 0 ) {this.initialiseJobLevel(jobLevels);}});
		this.jobTitleService.getAll().pipe(first()).pipe(takeUntil(this._destroy$)).subscribe((jobTitles:JobTitle[]) => {this.allJobTitleData = jobTitles; if( jobTitles !== undefined && jobTitles.length > 0 ) {this.initialiseJobTitle(jobTitles);}});
		this.teamService.getAll().pipe(first()).pipe(takeUntil(this._destroy$)).subscribe((teams:Team[]) => {this.allTeamData = teams; if( teams !== undefined && teams.length > 0 ) {this.initialiseTeam(teams);}});
	}

	ngOnDestroy(): void {
		this._destroy$.next(false);
		this._destroy$.complete();
	}
	private initialise(accounts:Account[]):void {this.primaryData = accounts;}
	private initialiseclient(clients:Client[]):void {this.clientData = clients;}
	private initialiseBrief(briefs:Brief[]):void {this.briefData = briefs;this.value = this.briefData.length+this.briefData.length;}
	private initialiseBriefPhase(briefPhases:BriefPhase[]):void {this.briefPhaseData = briefPhases;}
	private initialiseSchoolSubject(schoolsubjects:SchoolSubject[]):void {this.schoolsubjectData = schoolsubjects;}
	private initialiseBrand(brands:Brand[]):void {this.brandData = brands;}
	private initialiseCreative(creatives:Creative[]):void {this.creativeData = creatives;}
	private initialisecreativeExecutio(creativeExecutions:CreativeExecution[]):void {this.creativeEData = creativeExecutions;}
	private initialiseJobLevel(jobLevels:JobLevel[]):void {this.jobLevelData = jobLevels;}
	private initialiseJobTitle(jobTitles:JobTitle[]):void {this.jobTitleData = jobTitles;}
	private initialiseTeam(teams:Team[]):void {this.teamData = teams;}

	//_______________________________________________[ If user is a client]
	public logout() {
		this.accountService.logout();

		const { root, signIn } = ROUTER_UTILS.config.auth;
		this.router.navigate(['/']);
	}
}
