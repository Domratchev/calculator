import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'calc-display',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `{{value}}`,
  styles: [`
    :host {
      border: solid 1px;
      box-sizing: border-box;
      display: block;
      font-size: 2rem;
      height: 3rem;
      line-height: 1;
      margin: 0.5rem 0;
      padding: 0.5rem;
      text-align: right;
      width: 100%;
    }
  `]
})
export class DisplayComponent {
  @Input() value: string | null = '';
}
