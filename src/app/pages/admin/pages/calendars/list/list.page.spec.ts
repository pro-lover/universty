import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarListPage } from './list.page';


describe('Team ListPage', () => {
	let component: CalendarListPage;
	let fixture: ComponentFixture<CalendarListPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [CalendarListPage],
			teardown: { destroyAfterEach: false }
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(CalendarListPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
