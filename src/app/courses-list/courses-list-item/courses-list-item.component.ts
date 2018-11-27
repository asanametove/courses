import { Component, Input } from '@angular/core';
import { Course } from '@shared/course';

@Component({
  selector: 'courses-list-item',
  templateUrl: './courses-list-item.component.html',
})
export class CoursesListItemComponent {
  @Input() course: Course;
}
