import { ActionTypes, CourseDetailsActions } from '../actions/course-details-page.actions';
import { Course } from '@shared/course';

export default function reducer(
  state = null,
  { type, payload }: CourseDetailsActions,
): Course {
  switch (type) {
    case ActionTypes.Save: {
      return payload;
    }

    case ActionTypes.Reset: {
      return payload;
    }

    default: {
      return state;
    }
  }
}
