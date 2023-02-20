import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrandAddEditPage } from './add.edit.page';


describe('Brand Add/Edit Page', () => {
	let component: BrandAddEditPage;
	let fixture: ComponentFixture<BrandAddEditPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [BrandAddEditPage],
			teardown: { destroyAfterEach: false }
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(BrandAddEditPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
