import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionMenusComponent } from './gestion-menus.component';

describe('GestionMenusComponent', () => {
  let component: GestionMenusComponent;
  let fixture: ComponentFixture<GestionMenusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionMenusComponent]
    });
    fixture = TestBed.createComponent(GestionMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
