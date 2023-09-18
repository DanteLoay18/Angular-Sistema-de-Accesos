import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppGeneralFooterComponent } from './app-general-footer.component';

describe('AppGeneralFooterComponent', () => {
  let component: AppGeneralFooterComponent;
  let fixture: ComponentFixture<AppGeneralFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppGeneralFooterComponent]
    });
    fixture = TestBed.createComponent(AppGeneralFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
