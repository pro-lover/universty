import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeamAddEditPage } from './add.edit.page';


describe('Client Add/Edit Page', () => {
	let component: TeamAddEditPage;
	let fixture: ComponentFixture<TeamAddEditPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TeamAddEditPage],
			teardown: { destroyAfterEach: false }
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TeamAddEditPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
