import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientAddEditPage } from './add.edit.page';


describe('Client Add/Edit Page', () => {
	let component: ClientAddEditPage;
	let fixture: ComponentFixture<ClientAddEditPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientAddEditPage],
			teardown: { destroyAfterEach: false }
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientAddEditPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
