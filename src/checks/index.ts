import Configuration from '../configuration';
import Base from './base';
import Logger from '../logger';

/**
 * 
 * @param logger 
 * @param check 
 * @param configuration 
 */
export default async function run(logger: Logger, check: Base, configuration: Configuration): Promise<boolean> {
    let result: boolean;

    logger.start(`Checking ${check.name}`);

    //Perform check, catch any exceptions
    try {
        result = await check.check(configuration);
    }
    catch (err) {
        logger.fail(`Failed checking ${check.name}: ${err.message}`)
        return false;
    }

    //Update logger with result of check
    if (result) {
        logger.success();
        return true;
    }
    else {
        logger.fail(`Failed checking ${check.name}`);
        return false;
    }
}