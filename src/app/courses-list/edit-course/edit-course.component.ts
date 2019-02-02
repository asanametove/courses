import { Component, OnInit } from '@angular/core';
import { CoursesService } from '@core/courses/courses.service';
import { Course } from '@shared/course';
import { ActivatedRoute } from '@angular/router';

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
  ) { }

  ngOnInit() {
    const { id } = this.route.snapshot.params;
    this.course = this.coursesService.getCourseById(id);
  }

}
