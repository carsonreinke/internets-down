import Ping from './ping';
import Configuration from '../configuration';

const NAME = 'gateway';

export default class Gateway extends Ping {
    constructor() {
        super(NAME);
    }

    async check(configuration: Configuration): Promise<boolean> {
        return await [configuration.internalGateway, configuration.externalGateway]
            .filter((address) => !!address)
            .every(async (address) => await this.ping(address))
    }
}