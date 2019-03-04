import { ActionTypes, CoursesActions } from '../actions/courses-page.actions';
import { Course } from '@shared/course';

export default function reducer(
  state = [],
  { type, payload }: CoursesActions,
): Course[] {
  switch (type) {
    case ActionTypes.Save: {
      return [...state, ...payload];
    }

    case ActionTypes.Reset: {
      return [];
    }

    default: {
      return state;
    }
  }
}
