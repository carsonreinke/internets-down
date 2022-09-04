import { IP } from './common';
export interface Options {
    testDNS: IP;
    hostname: string;
    externalGateway: IP;
}
export default function (argv: string[]): Promise<Options>;
