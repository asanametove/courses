import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Course, CourseUpdateInfo } from '@shared/course';
import { CourseNotFoundError } from '@shared/errors';
import { CourseRawData, CourseLoadConfig } from '@shared/common.interfaces';
import * as api from '@shared/api';

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

  // TODO Move it to separate service
  private buildUrl(base: string, paramsMap: Object): string {
    const paramsString = Object.entries(paramsMap)
      .map((pair) => pair.join('='))
      .join('&');

    return [base, paramsString]
      .filter(Boolean)
      .join('?');
  }

  getCourses(config: CourseLoadConfig): Observable<Course[]> {
    return this.http.get(this.buildUrl(api.courses, config)).pipe(
      map((data: CourseRawData[]) => data.map(this.toCourse)),
    );
  }

  createCourse(title: string, duration: number, description: string, date: Date): Observable<any> {
    return this.http.post(api.courses, {
      name: title,
      length: duration,
      description,
      date,
    });
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

  removeCourse(id: string): Observable<any> {
    return this.http.delete(`${api.courses}/${id}`);
  }
}
