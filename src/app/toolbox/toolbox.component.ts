import { Component } from '@angular/core';

@Component({
  selector: 'courses-toolbox',
  templateUrl: './toolbox.component.html',
})
export class ToolboxComponent {
  query = '';

  onSubmit(): void {
    console.log(this.query);
  }
}
