import { Routable } from './common.interfaces';

export class Breadcrumb implements Routable {
    constructor(
        public title: string,
        public link: string,
        public isActive = false,
    ) {}
}
