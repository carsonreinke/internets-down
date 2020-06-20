import { Command } from 'commander';
import commander = require('commander');
import { IPv4 } from 'ip-num';
import version from './version';

export interface Options {
    testDNS: IPv4;
    hostname: string;
    externalGateway: IPv4;
}

/**
 * Parse the string into IPv4 format
 * 
 * @param value 
 * @returns IPv4
 */
function parseIP(value: string): IPv4 {
    return IPv4.fromDecimalDottedString(value);
}

export default async function (argv: string[]): Promise<Options> {
    const program: commander.Command = new Command();

    //Get the version directly from this package
    program.version(await version());

    //Options
    program.option('--dns <ip>', 'Additional DNS server to check', parseIP, IPv4.fromDecimalDottedString('1.1.1.1'));
    program.option('--gateway <ip>', 'External gateway to check', parseIP);
    program.option('--hostname <host>', 'Hostname to check', 'example.com');

    //Parse the provided arguments
    await program.parseAsync(argv);

    return { testDNS: program.dns, hostname: program.hostname, externalGateway: program.gateway };
}