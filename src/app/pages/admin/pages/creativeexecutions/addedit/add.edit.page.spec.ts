import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreativeExecutionAddEditPage } from './add.edit.page';


describe('CreativeExecution Add/Edit Page', () => {
	let component: CreativeExecutionAddEditPage;
	let fixture: ComponentFixture<CreativeExecutionAddEditPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [CreativeExecutionAddEditPage],
			teardown: { destroyAfterEach: false }
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(CreativeExecutionAddEditPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
