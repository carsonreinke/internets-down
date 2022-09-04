import Base from './base';
import { IP } from '../common';
export default abstract class Ping extends Base {
    ping(address: IP): Promise<boolean>;
}
