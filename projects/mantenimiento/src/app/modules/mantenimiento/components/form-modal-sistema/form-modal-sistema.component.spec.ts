import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormModalSistemaComponent } from './form-modal-sistema.component';

describe('FormModalSistemaComponent', () => {
  let component: FormModalSistemaComponent;
  let fixture: ComponentFixture<FormModalSistemaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormModalSistemaComponent]
    });
    fixture = TestBed.createComponent(FormModalSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
