import Base from './base';
import { URL } from 'url';
import axios, { AxiosRequestConfig } from 'axios';
import Configuration from '../configuration';

const NAME = 'HTTP';
const AXIOS_REQUEST_CONFIG: AxiosRequestConfig = {
    timeout: 1000
};

export default class HTTP extends Base {
    constructor() {
        super(NAME);
    }

    async check(configuration: Configuration): Promise<boolean> {
        const url: URL = new URL(`https://${configuration.hostname}`);

        await axios.get(url.toString(), AXIOS_REQUEST_CONFIG);

        return true;
    }
}