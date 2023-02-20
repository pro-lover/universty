import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobTitleAddEditPage } from './add.edit.page';


describe('JobTitle Add/Edit Page', () => {
	let component: JobTitleAddEditPage;
	let fixture: ComponentFixture<JobTitleAddEditPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [JobTitleAddEditPage],
			teardown: { destroyAfterEach: false }
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(JobTitleAddEditPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
