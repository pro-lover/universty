import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobTitleListPage } from './list.page';


describe('JobTitle ListPage', () => {
	let component: JobTitleListPage;
	let fixture: ComponentFixture<JobTitleListPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [JobTitleListPage],
			teardown: { destroyAfterEach: false }
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(JobTitleListPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
