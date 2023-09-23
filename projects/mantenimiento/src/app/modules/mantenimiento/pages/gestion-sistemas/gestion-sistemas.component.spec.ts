import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionSistemasComponent } from './gestion-sistemas.component';

describe('GestionSistemasComponent', () => {
  let component: GestionSistemasComponent;
  let fixture: ComponentFixture<GestionSistemasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionSistemasComponent]
    });
    fixture = TestBed.createComponent(GestionSistemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
