import { Component } from '@angular/core';
import { RouteName } from '@shared/route-name';
import { CoursesService } from '@core/courses/courses.service';
import { NavigationService } from '@core/navigation/navigation.service';
import { CourseUpdateInfo } from '@shared/course';

@Component({
  selector: 'courses-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss'],
})
export class CreateCourseComponent {

  constructor(
    private coursesService: CoursesService,
    private navigationService: NavigationService,
  ) {}

  onSave({ title, duration, description, date }: CourseUpdateInfo) {
    this.coursesService.createCourse(title, duration, description, new Date(date))
      .subscribe(() => {
        this.navigationService.navigateByUrl(RouteName.Courses);
      });
  }

  onCancel() {
    this.navigationService.navigateByUrl(RouteName.Root);
  }

}
