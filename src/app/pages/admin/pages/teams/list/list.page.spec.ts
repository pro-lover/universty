import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeamListPage } from './list.page';


describe('Team ListPage', () => {
	let component: TeamListPage;
	let fixture: ComponentFixture<TeamListPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TeamListPage],
			teardown: { destroyAfterEach: false }
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TeamListPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
