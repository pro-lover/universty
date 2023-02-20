import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrandKPIAddEditPage } from './add.edit.page';


describe('BrandKPI Add/Edit Page', () => {
	let component: BrandKPIAddEditPage;
	let fixture: ComponentFixture<BrandKPIAddEditPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [BrandKPIAddEditPage],
			teardown: { destroyAfterEach: false }
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(BrandKPIAddEditPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
