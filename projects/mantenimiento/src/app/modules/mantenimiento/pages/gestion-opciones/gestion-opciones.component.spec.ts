import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionOpcionesComponent } from './gestion-opciones.component';

describe('GestionOpcionesComponent', () => {
  let component: GestionOpcionesComponent;
  let fixture: ComponentFixture<GestionOpcionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionOpcionesComponent]
    });
    fixture = TestBed.createComponent(GestionOpcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
