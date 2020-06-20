import Base from './base';
import { IPv4 } from 'ip-num';
export default abstract class Ping extends Base {
    ping(address: IPv4): Promise<boolean>;
}
