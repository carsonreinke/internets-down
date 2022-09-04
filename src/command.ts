import { Command } from 'commander';
import commander = require('commander');
import { IP, parseIP as _parseIP } from './common';
import version from './version';

export interface Options {
    testDNS: IP;
    hostname: string;
    externalGateway: IP;
}

/**
 * Parse the string into IPv4 format
 * 
 * @param value 
 * @returns IP
 */
function parseIP(value: string): IP | string {
    return _parseIP(value);
}

export default async function (argv: string[]): Promise<Options> {
    const program: commander.Command = new Command();

    //Get the version directly from this package
    program.version(await version());

    //Options
    program.option('--dns <ip>', 'Additional DNS server to check', parseIP, '1.1.1.1');
    program.option('--gateway <ip>', 'External gateway to check', parseIP);
    program.option('--hostname <host>', 'Hostname to check', 'example.com');

    //Parse the provided arguments
    await program.parseAsync(argv);

    //Workaround for default value displaying properly in help
    if(typeof(program.dns) === 'string') {
        program.dns = parseIP(program.dns);
    }

    return { testDNS: program.dns, hostname: program.hostname, externalGateway: program.gateway };
}