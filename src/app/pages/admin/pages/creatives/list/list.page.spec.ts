import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreativeListPage } from './list.page';


describe('Creative ListPage', () => {
	let component: CreativeListPage;
	let fixture: ComponentFixture<CreativeListPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [CreativeListPage],
			teardown: { destroyAfterEach: false }
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(CreativeListPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
