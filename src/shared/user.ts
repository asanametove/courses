export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
}

export class User implements IUser {
    static id = 0;

    constructor(
        public firstName: string,
        public lastName: string,
        public id = String(++User.id),
    ) {}
}
