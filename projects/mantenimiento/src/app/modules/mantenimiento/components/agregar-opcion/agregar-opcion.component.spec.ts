import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarOpcionComponent } from './agregar-opcion.component';

describe('AgregarOpcionComponent', () => {
  let component: AgregarOpcionComponent;
  let fixture: ComponentFixture<AgregarOpcionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarOpcionComponent]
    });
    fixture = TestBed.createComponent(AgregarOpcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
