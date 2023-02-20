import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarAddEditPage } from './add.edit.page';


describe('Client Add/Edit Page', () => {
	let component: CalendarAddEditPage;
	let fixture: ComponentFixture<CalendarAddEditPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [CalendarAddEditPage],
			teardown: { destroyAfterEach: false }
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(CalendarAddEditPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
