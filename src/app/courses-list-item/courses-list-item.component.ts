import { Component, Input } from '@angular/core';
import { ICourse } from '../../shared/course';

@Component({
  selector: 'app-courses-list-item',
  templateUrl: './courses-list-item.component.html',
})
export class CoursesListItemComponent {
  @Input() course: ICourse;
}
