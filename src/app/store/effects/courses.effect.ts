import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { ActionTypes as CoursesActionTypes, SaveCourses, CoursesActions, LoadCourses } from '@store/actions/courses-page.actions';
import {
  ActionTypes as CourseDetailsActionTypes,
  LoadCourseDetails,
  CourseDetailsActions,
  SaveCourseDetails,
  UpdateCourseDetails,
  UpdateCourseDetailsSuccess,
} from '@store/actions/course-details-page.actions';
import { CoursesService } from '@core/courses/courses.service';
import { Course } from '@shared/course';
import { Action } from '@ngrx/store';
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
    mergeMap<LoadCourses, CoursesActions>(({ payload }) => this.coursesService.getCourses(payload).pipe(
      map(courses => new SaveCourses(courses)),
      catchError(() => of(new SaveCourses([]))),
    )),
  );

  @Effect()
  loadCourseDetails$ = this.actions$.pipe(
    ofType(CourseDetailsActionTypes.Load),
    mergeMap<LoadCourseDetails, CourseDetailsActions>(({ payload }) => this.coursesService.getCourseById(payload).pipe(
      map(course => new SaveCourseDetails(course)),
      catchError(() => of(new SaveCourseDetails(new Course()))),
    )),
  );

  @Effect()
  updateCourseDetails$ = this.actions$.pipe(
    ofType(CourseDetailsActionTypes.Update),
    mergeMap<UpdateCourseDetails, Action>(({payload}) => this.coursesService.createCourse(payload).pipe(
      map(() => new UpdateCourseDetailsSuccess()),
      tap(() => this.navigationService.navigateByUrl(RouteName.Courses)),
    )),
  );
}
