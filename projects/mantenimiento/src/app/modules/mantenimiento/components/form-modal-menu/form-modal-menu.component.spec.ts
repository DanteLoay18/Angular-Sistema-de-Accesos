import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormModalMenuComponent } from './form-modal-menu.component';

describe('FormModalMenuComponent', () => {
  let component: FormModalMenuComponent;
  let fixture: ComponentFixture<FormModalMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormModalMenuComponent]
    });
    fixture = TestBed.createComponent(FormModalMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
