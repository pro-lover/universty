import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BriefComponent } from './brief.component';

describe('BriefComponent', () => {
  let component: BriefComponent;
  let fixture: ComponentFixture<BriefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [BriefComponent],
    imports: [RouterTestingModule],
    teardown: { destroyAfterEach: false }
   }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
