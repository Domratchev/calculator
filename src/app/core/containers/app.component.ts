import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { Observable } from 'rxjs';

import { CalculatorService } from '../services';

@Component({
  selector: 'calc-app',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <calc-toolbar>Equal Experts</calc-toolbar>
    <div class="content" role="main">
      <calc-display [value]="display$ | async"></calc-display>
      <calc-keyboard (click)="onClick($event)"></calc-keyboard>
    </div>
  `,
  styles: [`
  `]
})
export class AppComponent {
  display$: Observable<string>;

  constructor(private calculatorService: CalculatorService) {
    this.display$ = calculatorService.display$;
  }

  onClick(symbol: string): void {
    this.calculatorService.processSymbol(symbol as any);
  }

  @HostListener('document:paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    const paste = event.clipboardData?.getData('text');

    if (paste) {
      this.calculatorService.setOperand(paste);
    }
  }
}
