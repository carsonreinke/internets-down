import Ping from './ping';
import Configuration from '../configuration';
export default class Gateway extends Ping {
    constructor();
    check(configuration: Configuration): Promise<boolean>;
}
