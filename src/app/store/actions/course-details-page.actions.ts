import { Action } from '@ngrx/store';
import { Course, CourseUpdateInfo } from '@shared/course';

export enum ActionTypes {
  Load = '[Course details page] Load course',
  Save = '[Course details page] Save course',
  Update = '[Course details page] Update course',
  UpdateError = '[Course details page] Update course error',
  Reset = '[Course details page] Reset course',
}

export class LoadCourseDetails implements Action {
  readonly type = ActionTypes.Load;

  constructor(
    public payload: string,
  ) {}
}

export class SaveCourseDetails implements Action {
  readonly type = ActionTypes.Save;

  constructor(
    public payload: Course,
  ) {}
}

export class ResetCourseDetails implements Action {
  readonly type = ActionTypes.Reset;
  payload = null;
}

export class UpdateCourseDetails implements Action {
  readonly type = ActionTypes.Update;

  constructor(
    public id: string,
    public payload: CourseUpdateInfo,
  ) {}
}
export class UpdateCourseDetailsError implements Action {
  readonly type = ActionTypes.UpdateError;
}

export type CourseDetailsActions = SaveCourseDetails | ResetCourseDetails;
