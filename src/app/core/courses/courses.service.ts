import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Course, CourseUpdateInfo } from '@shared/course';
import { CourseRawData, CourseLoadConfig, Author } from '@shared/common.interfaces';
import * as api from '@shared/api';
import { Store } from '@ngrx/store';
import { AppState } from '@store/reducers';
import { ResetCourses } from '@store/actions/courses-page.actions';
import { UpdateCourseDetailsError } from '../../store/actions/course-details-page.actions';
import { DateTimeService } from 'src/app/utils/date-time-service';

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
    private dateTimeService: DateTimeService,
  ) {}

  // TODO Create MappingService
  private toCourse = ({
    name: title,
    length: duration,
    description,
    date: creationDate,
    id,
    isTopRated: topRated,
    authors,
  }: CourseRawData): Course => new Course({
    title,
    duration,
    description,
    creationDate: new Date(creationDate),
    id: String(id),
    topRated,
    authors: authors.map(this.toAuthor),
  })

  private toAuthor = (data: any): Author => {
    let { name } = data;
    const { firstName, lastName, id } = data;
    name = name || [firstName, lastName].join(' ');
    return { name, id };
  }

  private toCourseDto = ({
    title: name,
    duration: length,
    description,
    creationDate: date,
    topRated: isTopRated,
    authors,
  }: Course): CourseRawData => ({
    name,
    length,
    description,
    date: date.toString(),
    isTopRated,
    authors,
  })

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

  createCourse(course: Course): Observable<any> {
    return this.http.post(api.courses, this.toCourseDto(course)).pipe(
      catchError((err) => {
        console.error(err);
        return of(new UpdateCourseDetailsError());
      }),
    );
  }

  getCourseById(id: string): Observable<Course> {
    return this.http.get(`${api.courses}/${id}`).pipe(
      map((data: CourseRawData) => this.toCourse(data)),
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
