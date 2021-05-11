import { componentFactoryName } from '@angular/compiler';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MaterialModule } from 'src/app/material';

import { KeyboardComponent } from './keyboard.component';

describe('DisplayComponent', () => {
  let component: KeyboardComponent;
  let fixture: ComponentFixture<KeyboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [ KeyboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should define buttons', () => {
    expect(component.buttons.join('')).toEqual('789/456*123-.0=+C');
  });

  it('should display all buttons', () => {
    component.buttons.forEach(symbol =>
      expect(fixture.debugElement.queryAll(By.css('button.mat-raised-button span.mat-button-wrapper')).find(
        item => item.nativeElement.textContent === symbol)
      ).toBeTruthy()
    );
  });
});
