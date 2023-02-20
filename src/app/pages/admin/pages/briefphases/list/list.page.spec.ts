import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BriefPhaseListPage } from './list.page';


describe('BriefPhase ListPage', () => {
	let component: BriefPhaseListPage;
	let fixture: ComponentFixture<BriefPhaseListPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [BriefPhaseListPage],
			teardown: { destroyAfterEach: false }
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(BriefPhaseListPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
