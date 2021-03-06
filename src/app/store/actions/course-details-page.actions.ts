import { Action } from '@ngrx/store';
import { Course, CourseUpdateInfo } from '@shared/course';

export enum ActionTypes {
  Load = '[Course details page] Load course',
  Save = '[Course details page] Save course',
  Update = '[Course details page] Update course',
  UpdateSuccess = '[Course details page] Update course success',
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

// TODO Update actions should be renamed to Save or Create
export class UpdateCourseDetails implements Action {
  readonly type = ActionTypes.Update;

  constructor(
    public payload: Course,
  ) {}
}
export class UpdateCourseDetailsError implements Action {
  readonly type = ActionTypes.UpdateError;
}

export class UpdateCourseDetailsSuccess implements Action {
  readonly type = ActionTypes.UpdateSuccess;
}

export type CourseDetailsActions = SaveCourseDetails | ResetCourseDetails;
