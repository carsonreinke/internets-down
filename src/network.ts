import { NetworkInterfaceInfoIPv4, NetworkInterfaceInfo, networkInterfaces } from 'os';
import { IPv4 } from 'ip-num';
import defaultGateway = require('default-gateway');
import { promises as dns } from 'dns';

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
export async function currentInternalGateway(): Promise<Gateway | undefined> {
    const gateway: DefaultGateway = await defaultGateway.v4();

    if (!gateway || !gateway.gateway) {
        return undefined;
    }

    return {
        address: IPv4.fromDecimalDottedString(gateway.gateway),
        interface: gateway.interface
    };
}

/**
 * 
 */
export function currentDNS(): IPv4[] {
    return dns.getServers().map(IPv4.fromDecimalDottedString);
}

/**
 * Load the network interfaces and gateway
 * 
 * @returns NetworkInterface | undefined
 */
export async function currentInterface(): Promise<NetworkInterface | undefined> {
    const interfaces: NodeJS.Dict<NetworkInterfaceInfo[]> = networkInterfaces();
    const internalGateway: Gateway = await currentInternalGateway();
    const defaultDNS: IPv4[] = currentDNS();
    let found: NetworkInterface;

    Object.keys(interfaces).forEach((name: string) => {
        //Go through all interfaces with this name
        interfaces[name].filter(i => !i.internal && i.family === 'IPv4').forEach((inter: NetworkInterfaceInfoIPv4) => {
            //Provide the gateway if the network
            if (internalGateway === undefined || internalGateway.interface === name) {
                found = {
                    name,
                    address: IPv4.fromDecimalDottedString(inter.address),
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
