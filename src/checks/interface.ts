import Base from './base';
import Configuration from '../configuration';

const NAME = 'network interface';

export default class Interface extends Base {
    constructor() {
        super(NAME);
    }

    async check(configuration: Configuration): Promise<boolean> {
        return !!configuration.address;
    }
}