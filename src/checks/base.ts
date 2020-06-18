import Configuration from '../configuration';

export default abstract class Base {
    private _name: string;

    constructor(name: string) {
        this._name = name;
    }

    public get name() {
        return this._name;
    }

    abstract async check(configuration: Configuration): Promise<boolean>;
}
