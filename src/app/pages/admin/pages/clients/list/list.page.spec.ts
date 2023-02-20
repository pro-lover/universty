import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientListPage } from './list.page';


describe('Client ListPage', () => {
	let component: ClientListPage;
	let fixture: ComponentFixture<ClientListPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientListPage],
			teardown: { destroyAfterEach: false }
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientListPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
