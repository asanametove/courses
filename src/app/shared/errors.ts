export class CourseNotFoundError extends Error {
  constructor() {
    super('Course not found');
  }
}

export class InvalidDateFormatError extends Error {
  constructor() {
    super('Invalid Date');
  }
}
