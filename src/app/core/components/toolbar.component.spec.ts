import { TestBed } from '@angular/core/testing';
import { ToolbarComponent } from './toolbar.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ToolbarComponent
      ],
    }).compileComponents();
  });

  it('should create the toolbar', () => {
    const fixture = TestBed.createComponent(ToolbarComponent);
    const toolbar = fixture.componentInstance;
    expect(toolbar).toBeTruthy();
  });
});
