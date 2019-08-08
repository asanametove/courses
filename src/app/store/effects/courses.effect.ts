import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { ActionTypes as CoursesActionTypes, SaveCourses } from '@store/actions/courses-page.actions';
import {
  ActionTypes as CourseDetailsActionTypes,
  SaveCourseDetails,
  UpdateCourseDetailsSuccess,
} from '@store/actions/course-details-page.actions';
import { CoursesService } from '@core/courses/courses.service';
import { Course } from '@shared/course';
import { NavigationService } from '@core/navigation/navigation.service';
import { RouteName } from '@shared/route-name';

@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private navigationService: NavigationService,
  ) {}

  @Effect()
  loadCourses$ = this.actions$.pipe(
    ofType(CoursesActionTypes.Load),
    mergeMap(({ payload }) => this.coursesService.getCourses(payload).pipe(
      map(courses => new SaveCourses(courses)),
      catchError(() => of(new SaveCourses([]))),
    )),
  );

  @Effect()
  loadCourseDetails$ = this.actions$.pipe(
    ofType(CourseDetailsActionTypes.Load),
    mergeMap(({ payload }) => this.coursesService.getCourseById(payload).pipe(
      map(course => new SaveCourseDetails(course)),
      catchError(() => of(new SaveCourseDetails(new Course()))),
    )),
  );

  @Effect()
  updateCourseDetails$ = this.actions$.pipe(
    ofType(CourseDetailsActionTypes.Update),
    mergeMap(({payload}) => this.coursesService.createCourse(payload).pipe(
      map(() => new UpdateCourseDetailsSuccess()),
      tap(() => this.navigationService.navigateByUrl(RouteName.Courses)),
    )),
  );
}
