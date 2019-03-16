import { Component, OnInit, forwardRef, Input, ChangeDetectorRef, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { DateTimeService } from 'src/app/utils/date-time-service';

@Component({
  selector: 'courses-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DateInputComponent),
      multi: true,
    },
  ],
})
export class DateInputComponent implements ControlValueAccessor, Validator {
  public placeholder = 'dd/MM/yyyy';
  public onChange: (value: string) => void;
  public onTouched: () => void;
  public value: string;

  constructor(
    private dateTimeService: DateTimeService,
  ) { }

  public writeValue(value: string) {
    this.value = value;
  }

  public registerOnChange(fn: (value: string) => void) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  public validate(control: AbstractControl): { wrongDateFormat: boolean } {
    return this.dateTimeService.isValidDate(control.value)
      ? null
      : { wrongDateFormat: true };
  }

}
