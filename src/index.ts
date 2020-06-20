import command, { Options } from './command';
import Configuration from './configuration';
import { currentInterface, NetworkInterface } from './network';
import Logger from './logger';
import run from './checks';
import Gateway from './checks/gateway';
import Interface from './checks/interface';
import Base from './checks/base';
import DNS from './checks/dns';
import Lookup from './checks/lookup';
import HTTP from './checks/http';
import { Writable } from 'stream';

module.exports = async (
    argv: string[] = process.argv, 
    stdout: Writable = process.stdout, 
    exitFn: (code?: number) => never = process.exit
): Promise<void> => {
    let options: Options;
    const logger: Logger = new Logger(stdout);

    //Handle the command line options
    try {
        options = await command(argv);
    }
    catch (err) {
        console.error(err);
        exitFn(1);
        return;
    }

    //Load the interface / configuration
    logger.start('Loading network information')
    let inter: NetworkInterface;
    try {
        inter = await currentInterface();
    }
    catch (err) {
        logger.fail(err.message);
        exitFn(2);
        return;
    }
    const configuration: Configuration = {
        ...options,
        ...inter
    };
    logger.success();

    //Run all of our checks
    const checks: Base[] = [
        new Interface(),
        new Gateway(),
        new DNS(),
        new Lookup(),
        new HTTP()
    ];
    let check: Base;
    for (check of checks) {
        if (!await run(logger, check, configuration)) {
            exitFn(3);
            return;
        }
    }
};