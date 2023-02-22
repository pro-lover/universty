import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SchoolSubjectListPage } from './list.page';


describe('SchoolSubject ListPage', () => {
	let component: SchoolSubjectListPage;
	let fixture: ComponentFixture<SchoolSubjectListPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SchoolSubjectListPage],
			teardown: { destroyAfterEach: false }
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(SchoolSubjectListPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
