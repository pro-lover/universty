import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SchoolCertificateListPage } from './list.page';


describe('SchoolCertificate ListPage', () => {
	let component: SchoolCertificateListPage;
	let fixture: ComponentFixture<SchoolCertificateListPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SchoolCertificateListPage],
			teardown: { destroyAfterEach: false }
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(SchoolCertificateListPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
