import Ping from './ping';
import Configuration from '../configuration';
import { IP } from '../common';

const NAME = 'gateway';

export default class Gateway extends Ping {
    constructor() {
        super(NAME);
    }

    async check(configuration: Configuration): Promise<boolean> {
        const addresses: IP[] = [configuration.internalGateway, configuration.externalGateway]
            .filter((address) => !!address);

        return addresses.length !== 0
            && (await Promise.all(addresses.map(address => this.ping(address)))).every(v => v);
    }
}