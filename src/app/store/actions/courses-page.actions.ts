import { Action } from '@ngrx/store';
import { Course } from '@shared/course';
import { CourseLoadConfig } from '@shared/common.interfaces';

export enum ActionTypes {
  Load = '[Courses page] Load courses',
  Save = '[Courses page] Save courses',
  Reset = '[Courses page] Reset courses',
}

export class LoadCourses implements Action {
  readonly type = ActionTypes.Load;

  constructor(
    public payload: string,
  ) {}
}

export class SaveCourses implements Action {
  readonly type = ActionTypes.Save;

  constructor(
    public payload: Course[],
  ) {}
}

export class ResetCourses implements Action {
  readonly type = ActionTypes.Reset;
  public payload: Course[] = [];
}

export type CoursesActions = SaveCourses | ResetCourses;
