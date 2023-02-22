import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SchoolSubjectAddEditPage } from './add.edit.page';


describe('SchoolSubject Add/Edit Page', () => {
	let component: SchoolSubjectAddEditPage;
	let fixture: ComponentFixture<SchoolSubjectAddEditPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SchoolSubjectAddEditPage],
			teardown: { destroyAfterEach: false }
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(SchoolSubjectAddEditPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
