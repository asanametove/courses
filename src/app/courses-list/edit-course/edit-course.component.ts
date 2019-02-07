import { Component, OnInit } from '@angular/core';
import { CoursesService } from '@core/courses/courses.service';
import { Course, CourseUpdateInfo } from '@shared/course';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '@core/navigation/navigation.service';
import { RouteName } from '@shared/route-name';

@Component({
  selector: 'courses-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss'],
})
export class EditCourseComponent implements OnInit {

  course: Course;

  constructor(
    private coursesService: CoursesService,
    private route: ActivatedRoute,
    private navigationService: NavigationService,
  ) { }

  ngOnInit() {
    const { id } = this.route.snapshot.params;
    this.course = this.coursesService.getCourseById(id);
  }

  onSave(courseInfo: CourseUpdateInfo): void {
    this.coursesService.updateCourse(this.course.id, courseInfo);
    this.navigationService.navigateByUrl(RouteName.Courses);
  }

  onCancel(): void {
    this.navigationService.navigateByUrl(RouteName.Courses);
  }

}
