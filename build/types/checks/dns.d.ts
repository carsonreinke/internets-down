import Ping from './ping';
import Configuration from '../configuration';
export default class DNS extends Ping {
    constructor();
    check(configuration: Configuration): Promise<boolean>;
}
