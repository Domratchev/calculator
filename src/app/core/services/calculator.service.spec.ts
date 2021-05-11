import { TestBed } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import { TestScheduler } from 'rxjs/testing';

import { CalculatorService, DECIMAL_SEPARATOR, DIVISION_BY_ZERO_ERROR } from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;
  let scheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should display a first digit', () => {
    scheduler.run(({expectObservable, cold}) => {
      cold('-a').subscribe(() => service.processSymbol('1'));

      expectObservable(service.display$).toBe('-a', { a: '1' });
    });
  });

  it('should display a leading zero', () => {
    scheduler.run(({expectObservable, cold}) => {
      cold('-a').subscribe(() => service.processSymbol(DECIMAL_SEPARATOR));

      expectObservable(service.display$).toBe('-a', { a: '0.' });
    });
  });

  it('should display a second digit', () => {
    scheduler.run(({expectObservable, cold}) => {
      cold('-a-b', { a: '1', b: '2' }).subscribe((symbol) => service.processSymbol(symbol as any));

      expectObservable(service.display$).toBe('-a-b', { a: '1', b: '12' });
    });
  });

  it('should display a pasted number', () => {
    scheduler.run(({expectObservable, cold}) => {
      cold('-a').subscribe(() => service.setOperand('456'));

      expectObservable(service.display$).toBe('-a', { a: '456' });
    });
  });

  it('should process binary +', () => {
    scheduler.run(({expectObservable, cold}) => {
      cold('-a').subscribe(() => {
        service.setOperand('123');
        service.processSymbol('+');
        service.setOperand('321');
        service.processSymbol('+');
      });

      expectObservable(service.display$).toBe('-(aabc)', { a: '123', b: '321', c: '444' });
    });
  });

  it('should process binary -', () => {
    scheduler.run(({expectObservable, cold}) => {
      cold('-a').subscribe(() => {
        service.setOperand('123');
        service.processSymbol('-');
        service.setOperand('321');
        service.processSymbol('-');
      });

      expectObservable(service.display$).toBe('-(aabc)', { a: '123', b: '321', c: '-198' });
    });
  });

  it('should process binary + followed by binary *', () => {
    scheduler.run(({expectObservable, cold}) => {
      cold('-a').subscribe(() => {
        service.setOperand('1.5');
        service.processSymbol('+');
        service.processSymbol('.');
        service.processSymbol('5');
        service.processSymbol('*');
        service.processSymbol('3');
        service.processSymbol('=');
     });

      expectObservable(service.display$).toBe('-(aabcdef)', { a: '1.5', b: '0.', c: '0.5', d: '2', e: '3', f: '6' });
    });
  });

  it('should process binary / followed by binary *', () => {
    scheduler.run(({expectObservable, cold}) => {
      cold('-a').subscribe(() => {
        service.setOperand('1.5');
        service.processSymbol('/');
        service.processSymbol('3');
        service.processSymbol('*');
        service.processSymbol('2');
        service.processSymbol('=');
     });

      expectObservable(service.display$).toBe('-(aabcde)', { a: '1.5', b: '3', c: '0.5', d: '2', e: '1' });
    });
  });

  it('should display error when divided by 0', () => {
    scheduler.run(({expectObservable, cold}) => {
      cold('-a').subscribe(() => {
        service.setOperand('1.5');
        service.processSymbol('/');
        service.processSymbol('0');
        service.processSymbol('*');
        service.processSymbol('2');
        service.processSymbol('=');
      });

      expectObservable(service.display$).toBe('-(aabcdd)', { a: '1.5', b: '0', c: DIVISION_BY_ZERO_ERROR, d: '2' });
    });
  });

  it('should ignore second decimal separator', () => {
    scheduler.run(({expectObservable, cold}) => {
      cold('-a').subscribe(() => {
        service.setOperand('1.5');
        service.processSymbol('3');
        service.processSymbol(DECIMAL_SEPARATOR);
        service.processSymbol('4');
        service.processSymbol(DECIMAL_SEPARATOR);
        service.processSymbol('5');
      });

      expectObservable(service.display$).toBe('-(abcd)', { a: '1.5', b: '1.53', c: '1.534', d: '1.5345' });
    });
  });

  it('should clear operands and operation', () => {
    scheduler.run(({expectObservable, cold}) => {
      cold('-a').subscribe(() => {
        service.setOperand('1.5');
        service.processSymbol('3');
        service.processSymbol(DECIMAL_SEPARATOR);
        service.processSymbol('4');
        service.processSymbol(DECIMAL_SEPARATOR);
        service.processSymbol('5');
        service.processSymbol('C');
      });

      expectObservable(service.display$).toBe('-(abcde)', { a: '1.5', b: '1.53', c: '1.534', d: '1.5345', e: '' });
    });
  });
});
