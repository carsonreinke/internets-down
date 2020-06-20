import Ping from './ping';
import Configuration from '../configuration';
import { IPv4 } from 'ip-num';

const NAME = 'gateway';

export default class Gateway extends Ping {
    constructor() {
        super(NAME);
    }

    async check(configuration: Configuration): Promise<boolean> {
        const addresses: IPv4[] = [configuration.internalGateway, configuration.externalGateway]
            .filter((address) => !!address);

        return addresses.length !== 0
            && (await Promise.all(addresses.map(address => this.ping(address)))).every(v => v);
    }
}