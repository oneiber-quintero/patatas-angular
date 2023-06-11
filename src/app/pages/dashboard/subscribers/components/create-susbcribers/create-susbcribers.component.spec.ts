import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSusbcribersComponent } from './create-susbcribers.component';

describe('CreateSusbcribersComponent', () => {
  let component: CreateSusbcribersComponent;
  let fixture: ComponentFixture<CreateSusbcribersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSusbcribersComponent]
    });
    fixture = TestBed.createComponent(CreateSusbcribersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
