import Ping from './ping';
import Configuration from '../configuration';

const NAME = 'DNS';

export default class DNS extends Ping {
    constructor() {
        super(NAME);
    }

    async check(configuration: Configuration): Promise<boolean> {
        return await configuration.defaultDNS.find(async (address) => await this.ping)
            && await this.ping(configuration.testDNS);
    }
}