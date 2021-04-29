import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'calc-keyboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-grid-list cols="4" rowHeight="100px">
      <mat-grid-tile colspan="1" rowspan="1" *ngFor="let item of buttons">
        <calc-button (click)="click.emit($event)" [value]="item"></calc-button>
      </mat-grid-tile>
    </mat-grid-list>
  `,
  styles: [`
    :host {
      width: 100%;
    }
  `]
})
export class KeyboardComponent {
  @Output() click = new EventEmitter<string>();
  buttons = '789/456*123-.0=+'.split('');
}
