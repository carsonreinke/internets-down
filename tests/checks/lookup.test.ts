import Lookup from '../../src/checks/lookup';
import { IPv4 } from 'ip-num';

jest.mock('dns');
const dns = require('dns');

//Need to force mocking of property `promises` on `dns`
const mockDns = {
    setServers: jest.fn(),
    getServers: jest.fn().mockReturnValue([]),
    resolve: jest.fn()
};
Object.defineProperty(dns, 'promises', {
    get: () => mockDns
});

let lookup;

beforeEach(() => {
    lookup = new Lookup();
});

test('check', async () => {
    dns.promises.resolve.mockResolvedValue(['0.0.0.0']);

    const result = await lookup.check({ testDNS: IPv4.fromDecimalDottedString('0.0.0.0'), hostname: 'example.com' });

    expect(dns.promises.resolve).toHaveBeenCalled();
    expect(result).toBeTruthy();
});

test('check error', async () => {
    dns.promises.resolve.mockRejectedValue(new Error('Failed'));

    expect(
        lookup.check({ dns: IPv4.fromDecimalDottedString('0.0.0.0'), hostname: 'example.com' })
    ).rejects.toThrow();
});