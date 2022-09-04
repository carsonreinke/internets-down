import { IPv4, IPv6 } from 'ip-num';
export declare type IP = IPv4 | IPv6;
export declare function parseIP(address: string): IP;
