import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormModalSubmenuComponent } from './form-modal-submenu.component';

describe('FormModalSubmenuComponent', () => {
  let component: FormModalSubmenuComponent;
  let fixture: ComponentFixture<FormModalSubmenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormModalSubmenuComponent]
    });
    fixture = TestBed.createComponent(FormModalSubmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
