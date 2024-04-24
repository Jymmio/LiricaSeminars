import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPendingComponent } from './user-pending.component';

describe('UserPendingComponent', () => {
  let component: UserPendingComponent;
  let fixture: ComponentFixture<UserPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPendingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
