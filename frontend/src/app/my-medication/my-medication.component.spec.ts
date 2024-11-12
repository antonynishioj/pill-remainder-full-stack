import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMedicationComponent } from './my-medication.component';

describe('MyMedicationComponent', () => {
  let component: MyMedicationComponent;
  let fixture: ComponentFixture<MyMedicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyMedicationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyMedicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
