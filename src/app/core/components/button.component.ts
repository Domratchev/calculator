import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'calc-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<button mat-raised-button disableRipple="true" (click)="onClick()">{{value}}</button>`
})
export class ButtonComponent {
  @Input() value?: string = '';
  @Output() click = new EventEmitter<string>();

  onClick(): void {
    this.click.emit(this.value);
  }
}
