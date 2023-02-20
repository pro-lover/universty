import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BriefListPage } from './list.page';


describe('Brief ListPage', () => {
	let component: BriefListPage;
	let fixture: ComponentFixture<BriefListPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [BriefListPage],
			teardown: { destroyAfterEach: false }
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(BriefListPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
