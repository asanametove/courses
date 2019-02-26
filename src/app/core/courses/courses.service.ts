import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Course, CourseUpdateInfo } from '@shared/course';
import { CourseNotFoundError } from '@shared/errors';
import { CourseRawData, CourseLoadConfig } from '@shared/common.interfaces';
import * as api from '@shared/api';
import { LoadingService } from '@core/loading/loading.service';

@Injectable()
export class CoursesService {

  // TODO Remove after all methods integration with real API
  courses: Course[] = [];

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService,
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
  private getOptions(paramsMap: Object): { params: HttpParams } {
    const params = Object.entries(paramsMap).reduce(
      (acc, param) => acc.set(...param),
      new HttpParams(),
    );

    return { params };
  }

  getCourses(config: CourseLoadConfig): Observable<Course[]> {
    return this.http.get(api.courses, this.getOptions(config)).pipe(
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
