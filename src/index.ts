import command, { Options } from './command';
import Configuration from './configuration';
import { currentInterface } from './network';
import Logger from './logger';
import run from './checks';
import Gateway from './checks/gateway';
import Interface from './checks/interface';
import Base from './checks/base';
import DNS from './checks/dns';
import Lookup from './checks/lookup';
import HTTP from './checks/http';

module.exports = async () => {
    let options: Options;
    const logger: Logger = new Logger(process.stdout);

    //Handle the command line options
    try {
        options = await command(process.argv);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
        return;
    }

    //Load the interface / configuration
    logger.start('Loading network information')
    const inter = await currentInterface();
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
            process.exit(1);
            break;
        }
    }
};