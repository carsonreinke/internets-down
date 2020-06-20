import Ping from './ping';
import Configuration from '../configuration';

const NAME = 'DNS';

export default class DNS extends Ping {
    constructor() {
        super(NAME);
    }

    async check(configuration: Configuration): Promise<boolean> {
        return (await Promise.all(configuration.defaultDNS.map(address => this.ping(address)))).some(v => v)
            && await this.ping(configuration.testDNS);
    }
}