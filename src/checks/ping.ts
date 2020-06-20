import Base from './base';
import { IPv4 } from 'ip-num';
import ping, { pingResponse, extendedPingOptions } from 'pingman';

//Options to be used by `pingman`
const PING_OPTIONS: extendedPingOptions = {
    timeout: 1
};

export default abstract class Ping extends Base {
    async ping(address: IPv4): Promise<boolean> {
        const response: pingResponse = await ping(address.toString(), PING_OPTIONS);
        return response.alive;
    }
}
