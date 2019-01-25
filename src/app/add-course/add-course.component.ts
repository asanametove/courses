import { Component } from '@angular/core';
import { CoursesService } from '../courses-list/courses-list-item/courses.service';
import { NavigationService } from '../core/navigation/navigation.service';

@Component({
  selector: 'courses-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
})
export class AddCourseComponent {

  title: string;
  description: string;
  date: string;
  duration: number;
  authors: string;

  constructor(
    private coursesService: CoursesService,
    private navigationService: NavigationService,
  ) {}

  onSave() {
    const { title, duration, description, date } = this;
    this.coursesService.createCourse(title, duration, description, new Date(date));

    const { courses } = NavigationService.routes;
    this.navigationService.navigateByUrl(courses);
  }

  onCancel() {
    const { root } = NavigationService.routes;
    this.navigationService.navigateByUrl(root);
  }

}
