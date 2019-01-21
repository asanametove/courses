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
