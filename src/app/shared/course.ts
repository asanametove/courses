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
}
