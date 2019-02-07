import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Course, CourseUpdateInfo } from '@shared/course';
import { CourseNotFoundError } from '@shared/errors';
import { CourseRawData } from '@shared/common.interfaces';

@Injectable()
export class CoursesService {

  // TODO Remove after all methods integration with real API
  courses: Course[] = [];

  constructor(
    private http: HttpClient,
  ) {}

  // TODO Create MappingService
  private toCourse({
    name: title,
    length: duration,
    description,
    date: creationDate,
    id,
    isTopRated: topRated,
  }: CourseRawData): Course {
    return new Course(
      title,
      duration,
      description,
      new Date(creationDate),
      String(id),
      topRated,
    );
  }

  getCourses(start: number, count: number): Observable<Course[]> {
    return this.http.get(`http://localhost:3004/courses?start=${start}&count=${count}`).pipe(
      map((data: CourseRawData[]) => data.map(this.toCourse)),
    );
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
