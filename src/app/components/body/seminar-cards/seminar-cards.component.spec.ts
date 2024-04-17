import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeminarCardComponent } from './seminar-cards.component';

describe('SeminarCardComponent', () => {
  let component: SeminarCardComponent;
  let fixture: ComponentFixture<SeminarCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeminarCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeminarCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
