import { IP } from './common';
export default interface Configuration {
    defaultDNS: IP[];
    testDNS: IP;
    hostname: string;
    name?: string;
    address?: IP;
    internalGateway?: IP;
    externalGateway?: IP;
}
