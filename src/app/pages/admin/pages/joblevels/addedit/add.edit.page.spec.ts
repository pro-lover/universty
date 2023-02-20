import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobLevelAddEditPage } from './add.edit.page';


describe('JobLevel Add/Edit Page', () => {
	let component: JobLevelAddEditPage;
	let fixture: ComponentFixture<JobLevelAddEditPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [JobLevelAddEditPage],
			teardown: { destroyAfterEach: false }
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(JobLevelAddEditPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
