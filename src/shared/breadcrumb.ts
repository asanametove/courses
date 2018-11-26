export interface IBreadcrumb {
  title: string;
  link: string;
  isActive: boolean;
}

export class Breadcrumb implements IBreadcrumb {
    constructor(
        public title: string,
        public link: string,
        public isActive = false,
    ) {}
}
