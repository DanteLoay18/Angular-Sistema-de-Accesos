import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppGeneralContenedorPrincipalComponent } from './app-general-contenedor-principal.component';

describe('AppGeneralContenedorPrincipalComponent', () => {
  let component: AppGeneralContenedorPrincipalComponent;
  let fixture: ComponentFixture<AppGeneralContenedorPrincipalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppGeneralContenedorPrincipalComponent]
    });
    fixture = TestBed.createComponent(AppGeneralContenedorPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
