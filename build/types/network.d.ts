import { IPv4 } from 'ip-num';
export interface DefaultGateway {
    gateway: string;
    interface: string;
}
export interface Gateway {
    address: IPv4;
    interface: string;
}
export interface NetworkInterface {
    name: string;
    address: IPv4;
    defaultDNS: IPv4[];
    internalGateway?: IPv4;
}
/**
 * Get the current gateway
 *
 * @returns Gateway | undefined
 */
export declare function currentInternalGateway(): Promise<Gateway | undefined>;
/**
 *
 */
export declare function currentDNS(): IPv4[];
/**
 * Load the network interfaces and gateway
 *
 * @returns NetworkInterface | undefined
 */
export declare function currentInterface(): Promise<NetworkInterface | undefined>;
