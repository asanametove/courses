export interface Routable {
  link: string;
}

export interface Identifiable {
  id: string;
}

export interface Durable {
  duration: number;
}

export interface WithCreationDate {
  creationDate: Date;
}

export interface CourseRawData {
  authors: Author[];
  date: string;
  description: string;
  id?: number;
  isTopRated: boolean;
  length: number;
  name: string;
}

export interface CourseLoadConfig {
  start: number;
  count: number;
  textFragment?: string;
}

export interface Author {
  id: string;
  name: string;
}
