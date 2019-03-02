import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from 'src/environments/environment';
import loginReducer from './login.reducer';
import { User } from '@shared/user';

export enum StateKeys {
  Login,
}

export interface AppState {
  user: User;
}

export const reducers: ActionReducerMap<AppState> = {
  user: loginReducer,
};


export const selectUser = createSelector(
  createFeatureSelector<AppState, User>('user'),
  (state) => state,
);

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
