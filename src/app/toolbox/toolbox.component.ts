import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'courses-toolbox',
  templateUrl: './toolbox.component.html',
})
export class ToolboxComponent {
  @Output() search = new EventEmitter<string>();

  query = '';

  onSubmit(): void {
    this.search.emit(this.query.toLowerCase());
  }
}
