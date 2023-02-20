import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrandKPIListPage } from './list.page';


describe('BrandKPI ListPage', () => {
	let component: BrandKPIListPage;
	let fixture: ComponentFixture<BrandKPIListPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [BrandKPIListPage],
			teardown: { destroyAfterEach: false }
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(BrandKPIListPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
