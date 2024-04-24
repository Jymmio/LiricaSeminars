import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSeminarComponent } from './manage-seminar.component';

describe('ManageSeminarComponent', () => {
  let component: ManageSeminarComponent;
  let fixture: ComponentFixture<ManageSeminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageSeminarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageSeminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
