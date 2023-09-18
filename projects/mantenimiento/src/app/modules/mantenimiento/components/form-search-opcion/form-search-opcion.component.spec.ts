import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSearchOpcionComponent } from './form-search-opcion.component';

describe('FormSearchOpcionComponent', () => {
  let component: FormSearchOpcionComponent;
  let fixture: ComponentFixture<FormSearchOpcionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormSearchOpcionComponent]
    });
    fixture = TestBed.createComponent(FormSearchOpcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
