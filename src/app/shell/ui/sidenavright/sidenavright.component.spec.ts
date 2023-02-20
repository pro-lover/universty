import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SidenavrightComponent } from './sidenavright.component';

describe('SidenavrightComponent', () => {
  let component: SidenavrightComponent;
  let fixture: ComponentFixture<SidenavrightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidenavrightComponent ],
      imports: [RouterTestingModule],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavrightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
