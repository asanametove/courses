import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'courses-input-errors',
  templateUrl: './input-errors.component.html',
  styleUrls: ['./input-errors.component.scss'],
})
export class InputErrorsComponent {
  @Input() control: FormControl;

  // TODO Add some representation
  get errors(): string {
    return this.control
      && this.control.touched
      && this.control.errors
      && Object.keys(this.control.errors).toString()
      || '';
  }

}
