import Configuration from '../configuration';
import Base from './base';
import Logger from '../logger';
/**
 *
 * @param logger
 * @param check
 * @param configuration
 */
export default function run(logger: Logger, check: Base, configuration: Configuration): Promise<boolean>;
