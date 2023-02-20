import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrandListPage } from './list.page';


describe('Brand ListPage', () => {
	let component: BrandListPage;
	let fixture: ComponentFixture<BrandListPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [BrandListPage],
			teardown: { destroyAfterEach: false }
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(BrandListPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
