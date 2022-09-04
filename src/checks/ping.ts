import Base from './base';
import { IP } from '../common';
import { IPv4, IPv6 } from 'ip-num';
import ping, { pingResponse, extendedPingOptions } from 'pingman';

//Options to be used by `pingman`
const PING_OPTIONS: extendedPingOptions = {
    timeout: 1
};

export default abstract class Ping extends Base {
    async ping(address: IP): Promise<boolean> {
        const options: extendedPingOptions = Object.assign({
            IPV4: address instanceof IPv4,
            IPV6: address instanceof IPv6
        }, PING_OPTIONS);
        
        const response: pingResponse = await ping(address.toString(), options);
        return response.alive;
    }
}
