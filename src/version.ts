import readPackageJson from 'read-package-json';
import { promisify } from 'util';

interface Package {
    version: string
}

/**
 * Get the version number from package.json of this project
 * 
 * @returns Promise<string>
 */
export default async function (): Promise<string> {
    let pkg: Package;

    try {
        pkg = await promisify(readPackageJson)('../package.json', null, true);
    }
    catch (err) {
        pkg = { version: '0.0.0' };
    }

    return pkg.version;
}