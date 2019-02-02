import { Component, Output, EventEmitter } from '@angular/core';
import { RouteName } from '@shared/route-name';

@Component({
  selector: 'courses-toolbox',
  templateUrl: './toolbox.component.html',
})
export class ToolboxComponent {
  @Output() search = new EventEmitter<string>();

  query = '';
  createCourseLink = RouteName.NewCourse;

  onSubmit(): void {
    this.search.emit(this.query.toLowerCase());
  }
}
