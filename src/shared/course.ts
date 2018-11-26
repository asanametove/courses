export interface ICourse {
  id: string;
  title: string;
  creationDate: Date;
  duration: number;
  description: string;
}

export class Course implements ICourse {
    static id = 0;

    constructor(
        public title: string,
        public duration: number,
        public description: string,
        public creationDate = new Date(),
        public id = String(++Course.id),
    ) {}
}
