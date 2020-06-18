import HTTP from '../../src/checks/http';
import { IPv4 } from 'ip-num';

jest.mock('axios');
const axios = require('axios');

let http: HTTP;

beforeEach(() => {
    http = new HTTP();
    axios.get.mockResolvedValue({});
});

test('check', async () => {
    const result = await http.check({ defaultDNS: [], testDNS: IPv4.fromDecimalDottedString('0.0.0.0'), hostname: 'example.com' });

    expect(axios.get).toHaveBeenCalled();
    expect(result).toBeTruthy();
});