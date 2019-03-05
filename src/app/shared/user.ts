export class User {
    constructor(
        public first: string,
        public last?: string,
    ) {}

    public get isLoggedIn(): boolean {
        return !!this.first;
    }

    public toString(): string {
        return [this.first, this.last]
            .filter(Boolean)
            .join(' ');
    }
}
