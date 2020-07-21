import { promisify } from 'util';
import { resolve, join } from 'path'
const readPackageJson = require('read-package-json');

interface Package {
    version: string
}

/**
 * Get the version number from package.json of this project
 * 
 * @returns Promise<string>
 */
export default async function (): Promise<string> {
    const file: string = resolve(join(__dirname, '..', 'package.json'));
    const pkg: Package = await promisify(readPackageJson)(file, null, true);
    return pkg.version;
}