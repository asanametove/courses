import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Course, CourseUpdateInfo } from '@shared/course';
import { CourseRawData, CourseLoadConfig } from '@shared/common.interfaces';
import * as api from '@shared/api';
import { Store } from '@ngrx/store';
import { AppState } from '@store/reducers';
import { ResetCourses } from '@store/actions/courses-page.actions';
import { UpdateCourseDetailsError } from '../../store/actions/course-details-page.actions';

@Injectable()
export class CoursesService {
  private chunkSize = 5;
  private lastIndex = 0;
  private _isLoadAvailable: boolean;

  // TODO Remove after all methods integration with real API
  courses: Course[] = [];

  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
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
  private getOptions(query?: string): { params: HttpParams } {
    const paramsMap: CourseLoadConfig = {
      start: this.lastIndex,
      count: this.chunkSize,
    };

    if (query) {
      paramsMap.textFragment = query;
    }

    const params = Object.entries(paramsMap).reduce(
      (acc, param) => acc.set(...param),
      new HttpParams(),
    );

    return { params };
  }

  get isLoadAvailable(): boolean {
    return this._isLoadAvailable;
  }

  getCourses(query: string): Observable<Course[]> {
    const options = this.getOptions(query);

    return this.http.get(api.courses, options).pipe(
      map((data: CourseRawData[]) => data.map(this.toCourse)),
      tap((courses) => {
        this._isLoadAvailable = courses.length === this.chunkSize;
        this.lastIndex += this.chunkSize;
      }),
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

  getCourseById(id: string): Observable<Course> {
    return this.http.get(`${api.courses}/${id}`).pipe(
      map((data: CourseRawData) => this.toCourse(data)),
    );
  }

  updateCourse(id: string, payload: CourseUpdateInfo): Observable<any> {
    return this.http.post(`${api.courses}/${id}`, payload).pipe(
      catchError((err) => {
        console.error(err);
        return of(new UpdateCourseDetailsError());
      }),
    );
  }

  removeCourse(id: string): Observable<any> {
    return this.http.delete(`${api.courses}/${id}`);
  }

  resetCourses(): void {
    this.lastIndex = 0;
    this.store.dispatch(new ResetCourses());
  }
}
