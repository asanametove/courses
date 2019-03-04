import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from 'src/environments/environment';
import loginReducer from './login.reducer';
import coursesReducer from './courses.reducer';
import courseDetailsReducer from './course-details.reducer';
import { User } from '@shared/user';
import { Course } from '@shared/course';

export enum StateKeys {
  Login,
}

export interface AppState {
  user: User;
  courses: Course[];
  courseDetails: Course;
}

export const reducers: ActionReducerMap<AppState> = {
  user: loginReducer,
  courses: coursesReducer,
  courseDetails: courseDetailsReducer,
};


export const selectUser = createSelector(
  createFeatureSelector<AppState, User>('user'),
  (state) => state,
);

export const selectCourses = createSelector(
  createFeatureSelector<AppState, Course[]>('courses'),
  (state) => state,
);

export const selectCourseDetails = createSelector(
  createFeatureSelector<AppState, Course>('courseDetails'),
  (state) => state,
);

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
