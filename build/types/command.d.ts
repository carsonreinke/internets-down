import { IPv4 } from 'ip-num';
export interface Options {
    testDNS: IPv4;
    hostname: string;
    externalGateway: IPv4;
}
export default function (argv: string[]): Promise<Options>;
