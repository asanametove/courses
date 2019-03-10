import { Durable, Identifiable, WithCreationDate, Author } from './common.interfaces';

export class Course implements Durable, Identifiable, WithCreationDate {

  public title: string;
  public duration: number;
  public description: string;
  public creationDate: Date;
  public id: string;
  public topRated: boolean;
  public authors: Author[];

  constructor({
    title = '',
    duration = null,
    description = '',
    creationDate = new Date(),
    id = null,
    topRated = false,
    authors = [],
  } = {}) {
    Object.assign(this, {
      title,
      duration,
      description,
      creationDate,
      id,
      topRated,
      authors,
    });
  }

  public update(payload: CourseUpdateInfo) {
    Object.assign(this, payload);
  }
}

export interface CourseUpdateInfo {
  title?: string;
  duration?: number;
  description?: string;
  topRated?: boolean;
  creationDate?: Date;
  authors?: Author[];
}
