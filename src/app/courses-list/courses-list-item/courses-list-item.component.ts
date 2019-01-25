import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Course } from '@shared/course';

@Component({
  selector: 'courses-list-item',
  templateUrl: './courses-list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesListItemComponent {
  @Input() course: Course;
  @Output() deleteCourse = new EventEmitter<string>();

  onDelete(): void {
    this.deleteCourse.emit(this.course.id);
  }
}
