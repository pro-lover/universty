import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BriefAddEditPage } from './add.edit.page';


describe('Brief Add/Edit Page', () => {
	let component: BriefAddEditPage;
	let fixture: ComponentFixture<BriefAddEditPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [BriefAddEditPage],
			teardown: { destroyAfterEach: false }
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(BriefAddEditPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
