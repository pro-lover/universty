import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobLevelListPage } from './list.page';


describe('JobLevel ListPage', () => {
	let component: JobLevelListPage;
	let fixture: ComponentFixture<JobLevelListPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [JobLevelListPage],
			teardown: { destroyAfterEach: false }
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(JobLevelListPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
