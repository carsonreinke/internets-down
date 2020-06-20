import Configuration from '../configuration';
export default abstract class Base {
    private _name;
    constructor(name: string);
    get name(): string;
    abstract check(configuration: Configuration): Promise<boolean>;
}
