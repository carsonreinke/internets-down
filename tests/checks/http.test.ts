import HTTP from '../../src/checks/http';
import { IPv4 } from 'ip-num';
import Configuration from '../../src/configuration';

jest.mock('axios');
const axios = require('axios');

let http: HTTP,
    configuration: Configuration;

beforeEach(() => {
    http = new HTTP();
    configuration = { 
        defaultDNS: [], 
        testDNS: IPv4.fromDecimalDottedString('0.0.0.0'), 
        hostname: 'example.com', 
        internalGateway: IPv4.fromDecimalDottedString('0.0.0.0') 
    };

    axios.get.mockResolvedValue({});
});

test('check', async () => {
    const result = await http.check(configuration);

    expect(axios.get).toHaveBeenCalled();
    expect(result).toBeTruthy();
});

test('check error', async () => {
    axios.get.mockRejectedValue(new Error('Failed'));

    expect(http.check(configuration)).rejects.toThrow();
});