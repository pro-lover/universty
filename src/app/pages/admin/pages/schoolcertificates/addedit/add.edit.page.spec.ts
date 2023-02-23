import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SchoolCertificateAddEditPage } from './add.edit.page';


describe('SchoolCertificate Add/Edit Page', () => {
	let component: SchoolCertificateAddEditPage;
	let fixture: ComponentFixture<SchoolCertificateAddEditPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SchoolCertificateAddEditPage],
			teardown: { destroyAfterEach: false }
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(SchoolCertificateAddEditPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
