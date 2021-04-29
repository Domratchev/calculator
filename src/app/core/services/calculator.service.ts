import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export const DIVISION_BY_ZERO_ERROR = 'Cannot divide by zero';
export const DECIMAL_SEPARATOR = '.';

type DecimalDigit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
type DecimalSeparator = typeof DECIMAL_SEPARATOR;
type UnaryOperation = '+' | '-';
type BinaryOperation = '+' | '-' | '*' | '/';
type AssignmentOperation = '=';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  display$: Observable<string>;

  private displaySubject = new Subject<string>();
  private operand = '';
  private operand0 = '';
  private operation?: BinaryOperation;

  constructor() {
    this.display$ = this.displaySubject.asObservable();
  }

  processSymbol(symbol: DecimalDigit | DecimalSeparator | UnaryOperation | BinaryOperation | AssignmentOperation): void {
    switch (symbol) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        this.operand += symbol;
        this.displaySubject.next(this.operand);
        break;

      case DECIMAL_SEPARATOR:
        if (this.processDecimalSeparator()) {
          this.displaySubject.next(this.operand);
        }

        break;

      case '+':
      case '-':
        if (this.processUnaryOperation(symbol)) {
           this.displaySubject.next(this.operand);
        } else {
          if (this.processAssignmentOperation()) {
            this.displaySubject.next(this.operand0);
          }

          this.processBinaryOperation(symbol);
        }

        break;

      case '*':
      case '/':
        if (this.processAssignmentOperation()) {
          this.displaySubject.next(this.operand0);
        }

        this.processBinaryOperation(symbol);
        break;

      case '=':
        if (this.processAssignmentOperation()) {
          this.displaySubject.next(this.operand0);
        }

        break;
    }
  }

  setOperand(operand: string): boolean {
    let isProcessed = false;

    if (this.isNumeric(operand)) {
      this.operand = operand;
      this.displaySubject.next(this.operand);
      isProcessed = true;
    }

    return isProcessed;
  }

  protected getNumericValue(operand: string): number {
    return !operand ? 0 : operand.includes(DECIMAL_SEPARATOR) ? parseFloat(operand) : parseInt(operand, 10);
  }

  protected isNumeric(operand: string): boolean {
    return !!operand && operand !== '-' && operand !== DIVISION_BY_ZERO_ERROR;
  }

  protected processAssignmentOperation(): boolean {
    let isProcessed = false;

    if (this.isNumeric(this.operand)) {
      if (this.isNumeric(this.operand0) && this.operation) {
        const operand = this.getNumericValue(this.operand);
        const operand0 = this.getNumericValue(this.operand0);
        let result = '';

        switch (this.operation) {
          case '+':
            result = '' + (operand0 + operand);
            break;

          case '-':
            result = '' + (operand0 - operand);
            break;

          case '*':
            result = '' + (operand0 * operand);
            break;

          case '/':
            if (operand) {
              result = '' + (operand0 / operand);
            } else {
              result = DIVISION_BY_ZERO_ERROR;
            }
            break;
        }

        this.operand0 = result;
      } else {
        this.operand0 = this.operand;
      }

      this.operand = '';
      this.operation = undefined;
      isProcessed = true;
    }

    return isProcessed;
  }

  protected processBinaryOperation(operation: BinaryOperation): boolean {
    let isProcessed = false;

    if (this.isNumeric(this.operand)) {
      this.operand0 = this.operand;
      this.operand = '';
      isProcessed = true;
    }

    if (this.isNumeric(this.operand0)) {
      this.operation = operation;
      isProcessed = true;
    }

    return isProcessed;
  }

  protected processDecimalSeparator(): boolean {
    let isProcessed = false;

    if (!this.operand || this.operand === '-') {
      this.operand += '0' + DECIMAL_SEPARATOR;
      isProcessed = true;
    } else if (!this.operand.includes(DECIMAL_SEPARATOR)) {
      this.operand += DECIMAL_SEPARATOR;
      isProcessed = true;
    }

    return isProcessed;
  }

  protected processUnaryOperation(operation: UnaryOperation): boolean {
    let isProcessed = false;

    if (!this.isNumeric(this.operand)) {
      this.operand = operation === '-' ? '-' : '';
      isProcessed = true;
    }

    return isProcessed;
  }
}
