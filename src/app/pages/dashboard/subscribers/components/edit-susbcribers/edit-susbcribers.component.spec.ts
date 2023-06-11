import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSusbcribersComponent } from './edit-susbcribers.component';

describe('EditSusbcribersComponent', () => {
  let component: EditSusbcribersComponent;
  let fixture: ComponentFixture<EditSusbcribersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditSusbcribersComponent]
    });
    fixture = TestBed.createComponent(EditSusbcribersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
