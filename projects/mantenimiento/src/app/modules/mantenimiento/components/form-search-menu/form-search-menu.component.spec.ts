import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSearchMenuComponent } from './form-search-menu.component';

describe('FormSearchMenuComponent', () => {
  let component: FormSearchMenuComponent;
  let fixture: ComponentFixture<FormSearchMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormSearchMenuComponent]
    });
    fixture = TestBed.createComponent(FormSearchMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
