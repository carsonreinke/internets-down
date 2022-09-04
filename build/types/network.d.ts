import { IP } from './common';
export interface DefaultGateway {
    gateway: string;
    interface: string;
}
export interface Gateway {
    address: IP;
    interface: string;
}
export interface NetworkInterface {
    name: string;
    address: IP;
    defaultDNS: IP[];
    internalGateway?: IP;
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
export declare function currentDNS(): IP[];
/**
 * Load the network interfaces and gateway
 *
 * @returns NetworkInterface | undefined
 */
export declare function currentInterface(): Promise<NetworkInterface | undefined>;
