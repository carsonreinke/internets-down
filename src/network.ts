import { NetworkInterfaceInfoIPv4, NetworkInterfaceInfo, networkInterfaces } from 'os';
import { IP, parseIP } from './common';
import * as defaultGateway from 'default-gateway';
import { promises as dns } from 'dns';

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
export async function currentInternalGateway(): Promise<Gateway | undefined> {
    const gateway: DefaultGateway | undefined = await defaultGateway.v6().catch(() => {
        return defaultGateway.v4();
    });

    if (!gateway || !gateway.gateway) {
        return undefined;
    }

    return {
        address: parseIP(gateway.gateway),
        interface: gateway.interface
    };
}

/**
 * 
 */
export function currentDNS(): IP[] {
    return dns.getServers().map(parseIP);
}

/**
 * Load the network interfaces and gateway
 * 
 * @returns NetworkInterface | undefined
 */
export async function currentInterface(): Promise<NetworkInterface | undefined> {
    const interfaces: NodeJS.Dict<NetworkInterfaceInfo[]> = networkInterfaces();
    const internalGateway: Gateway = await currentInternalGateway();
    const defaultDNS: IP[] = currentDNS();
    let found: NetworkInterface;

    Object.keys(interfaces).forEach((name: string) => {
        //Go through all interfaces with this name
        interfaces[name].filter(i => !i.internal && (i.family === 'IPv4' || i.family === 'IPv6')).forEach((inter: NetworkInterfaceInfoIPv4) => {
            //Provide the gateway if the network
            if (internalGateway === undefined || internalGateway.interface === name) {
                found = {
                    name,
                    address: parseIP(inter.address),
                    defaultDNS
                };
                if (internalGateway !== undefined) {
                    found.internalGateway = internalGateway.address
                }
            }
        });
    });

    return found;
}
