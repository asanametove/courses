import { Identifiable } from './common.interfaces';

export class User implements Identifiable {
    private static id = 0;

    constructor(
        public firstName: string,
        public lastName: string,
        public id = String(++User.id),
    ) {}
}
