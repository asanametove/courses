import { Action } from '@ngrx/store';
import { User } from '@shared/user';

export enum ActionTypes {
  Login = '[Login Page] Login',
  Logout = '[Login Page] Logout',
}

export class Login implements Action {
  readonly type = ActionTypes.Login;

  constructor(
    public payload: User,
  ) {}
}

export class Logout implements Action {
  readonly type = ActionTypes.Logout;
  public payload = new User(null);
}

export type LoginActions = Login | Logout;
