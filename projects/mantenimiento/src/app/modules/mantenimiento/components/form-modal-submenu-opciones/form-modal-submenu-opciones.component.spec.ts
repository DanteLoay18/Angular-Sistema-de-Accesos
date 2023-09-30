import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormModalSubmenuOpcionesComponent } from './form-modal-submenu-opciones.component';

describe('FormModalSubmenuOpcionesComponent', () => {
  let component: FormModalSubmenuOpcionesComponent;
  let fixture: ComponentFixture<FormModalSubmenuOpcionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormModalSubmenuOpcionesComponent]
    });
    fixture = TestBed.createComponent(FormModalSubmenuOpcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
