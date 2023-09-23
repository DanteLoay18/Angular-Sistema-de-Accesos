import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSearchSistemaComponent } from './form-search-sistema.component';

describe('FormSearchSistemaComponent', () => {
  let component: FormSearchSistemaComponent;
  let fixture: ComponentFixture<FormSearchSistemaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormSearchSistemaComponent]
    });
    fixture = TestBed.createComponent(FormSearchSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
