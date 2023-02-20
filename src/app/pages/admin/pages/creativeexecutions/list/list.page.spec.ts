import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreativeExecutionListPage } from './list.page';


describe('CreativeExecution ListPage', () => {
	let component: CreativeExecutionListPage;
	let fixture: ComponentFixture<CreativeExecutionListPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [CreativeExecutionListPage],
			teardown: { destroyAfterEach: false }
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(CreativeExecutionListPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
