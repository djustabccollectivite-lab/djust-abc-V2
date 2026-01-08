export class ValueError extends Error {
    constructor(name: string) {
        super('Value Error');
        this.name = name;
    }
}
