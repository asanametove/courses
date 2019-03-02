import { ActionTypes, LoginActions } from '../actions/login-page.actions';
import { User } from '@shared/user';

export default function reducer(
  state = new User(null),
  { type, payload }: LoginActions,
): User {
  switch (type) {
    case ActionTypes.Login: {
      const { first, last } = payload;
      return new User(first, last);
    }

    case ActionTypes.Logout: {
      return new User(null);
    }

    default: {
      return state;
    }
  }
}
