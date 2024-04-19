import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSeminarComponent } from './new-seminar.component';

describe('NewSeminarComponent', () => {
  let component: NewSeminarComponent;
  let fixture: ComponentFixture<NewSeminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewSeminarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewSeminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
