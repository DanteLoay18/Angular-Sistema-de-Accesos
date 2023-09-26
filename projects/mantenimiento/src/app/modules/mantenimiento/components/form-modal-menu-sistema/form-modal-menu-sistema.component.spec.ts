import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormModalMenuSistemaComponent } from './form-modal-menu-sistema.component';

describe('FormModalMenuSistemaComponent', () => {
  let component: FormModalMenuSistemaComponent;
  let fixture: ComponentFixture<FormModalMenuSistemaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormModalMenuSistemaComponent]
    });
    fixture = TestBed.createComponent(FormModalMenuSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
