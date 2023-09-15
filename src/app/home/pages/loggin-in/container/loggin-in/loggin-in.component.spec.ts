import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogginInComponent } from './loggin-in.component';

describe('LogginInComponent', () => {
  let component: LogginInComponent;
  let fixture: ComponentFixture<LogginInComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogginInComponent]
    });
    fixture = TestBed.createComponent(LogginInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
