import { Injectable } from '@angular/core';
import { Course, CourseUpdateInfo } from '@shared/course';
import { CourseNotFoundError } from '@shared/errors';

@Injectable()
export class CoursesService {
  private courses: Course[] = [
    new Course('Title 1', 123, 'description1', new Date(2018, 11, 22)),
    new Course('Title 2', 3, 'description2', undefined, undefined, true),
    new Course('Title 3', 3, 'description3', new Date(2018, 11, 11)),
    new Course('Title 4', 3, 'description4'),
  ];

  getCourses(): Course[] {
    return this.courses;
  }

  createCourse(title: string, duration: number, description: string, date: Date): void {
    this.courses = [
      ...this.courses,
      new Course(title, duration, description, date),
    ];
  }

  getCourseById(id: string): Course {
    const course = this.courses.find((item) => id === item.id);
    if (!course) {
      throw new CourseNotFoundError();
    }

    return course;
  }

  updateCourse(id: string, payload: CourseUpdateInfo): void {
    const course = this.getCourseById(id);
    course.update(payload);
  }

  removeCourse(id: string): void {
    const currentCourse = this.getCourseById(id);
    this.courses = this.courses.filter((course) => course.id !== currentCourse.id);
  }
}
