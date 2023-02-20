import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BriefPhaseAddEditPage } from './add.edit.page';


describe('BriefPhase Add/Edit Page', () => {
	let component: BriefPhaseAddEditPage;
	let fixture: ComponentFixture<BriefPhaseAddEditPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [BriefPhaseAddEditPage],
			teardown: { destroyAfterEach: false }
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(BriefPhaseAddEditPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
