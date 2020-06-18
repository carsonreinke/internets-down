import Base from './base';
import Configuration from '../configuration';
import { promises as dns } from 'dns';

const NAME = 'DNS lookup';

export default class Lookup extends Base {
    constructor() {
        super(NAME);
    }

    async check(configuration: Configuration): Promise<boolean> {
        let existingServers: string[];

        try {
            existingServers = await dns.getServers();
            dns.setServers([configuration.testDNS.toString()]);

            const records: string[] = await dns.resolve(configuration.hostname, 'A');
            return records.length > 0;
        }
        finally {
            dns.setServers(existingServers);
        }
    }
}