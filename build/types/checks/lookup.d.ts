import Base from './base';
import Configuration from '../configuration';
export default class Lookup extends Base {
    constructor();
    check(configuration: Configuration): Promise<boolean>;
}
