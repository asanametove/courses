import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, Validator, AbstractControl, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';

@Component({
  selector: 'courses-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NumberInputComponent),
      multi: true,
    },
  ],
})
export class NumberInputComponent implements ControlValueAccessor, Validator {
  public value: number;
  public placeholder = 'Course duration (minutes)';
  public onTouched: () => void;
  public onChange: (value: string) => void;
  private pattern = /^\d*$/;

  public writeValue(value: number): void {
    this.value = value;
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public validate(control: AbstractControl): { wrongNumberFormat: boolean } {
    return this.pattern.test(control.value)
      ? null
      : { wrongNumberFormat: true };
  }
}
