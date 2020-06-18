import { IPv4 } from 'ip-num';

export default interface Configuration {
    defaultDNS: IPv4[];
    testDNS: IPv4;
    hostname: string;
    name?: string;
    address?: IPv4;
    internalGateway?: IPv4;
    externalGateway?: IPv4;
}