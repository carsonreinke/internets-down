import Base from './base';
import Configuration from '../configuration';
export default class HTTP extends Base {
    constructor();
    check(configuration: Configuration): Promise<boolean>;
}
