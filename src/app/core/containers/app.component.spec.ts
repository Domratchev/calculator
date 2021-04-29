import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  }));

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should render the toolbar`, () => {
    expect(fixture.nativeElement.querySelector('calc-toolbar')).toBeTruthy();
  });

  it(`should render the display`, () => {
    expect(fixture.nativeElement.querySelector('calc-display')).toBeTruthy();
  });

  it(`should render the keyboard`, () => {
    expect(fixture.nativeElement.querySelector('calc-keyboard')).toBeTruthy();
  });
});
