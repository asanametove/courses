import { Durable, Identifiable, WithCreationDate } from './common.interfaces';

export class Course implements Durable, Identifiable, WithCreationDate {
    private static id = 0;

    constructor(
        public title: string,
        public duration: number,
        public description: string,
        public creationDate = new Date(),
        public id = String(++Course.id),
        public topRated = false,
    ) {}

    update(payload: CourseUpdateInfo) {
      Object.assign(this, payload);
    }
}

export interface CourseUpdateInfo {
  title?: string;
  duration?: number;
  description?: string;
  topRated?: boolean;
  creationDate?: Date;
  authors?: string;
}
