import DNS from '../../src/checks/dns';
import Configuration from '../../src/configuration';
import { IPv4 } from 'ip-num';

jest.mock('pingman');
const ping = require('pingman');

let dns: DNS,
    configuration: Configuration;

beforeEach(() => {
    dns = new DNS();
    configuration = { 
        defaultDNS: [IPv4.fromDecimalDottedString('0.0.0.0')], 
        testDNS: IPv4.fromDecimalDottedString('0.0.0.0'), 
        hostname: 'example.com', 
        internalGateway: IPv4.fromDecimalDottedString('0.0.0.0') 
    };

    ping.mockResolvedValue({});
});

test('check', async () => {
    ping.mockResolvedValue({ alive: true });

    const result = await dns.check(configuration);

    expect(result).toBeTruthy();
    expect(ping).toHaveBeenCalled();
});

test('check not alive', async () => {
    ping.mockResolvedValue({ alive: false });

    const result = await dns.check(configuration);

    expect(result).toBeFalsy();
});

test('check error', async () => {
    ping.mockRejectedValue(new Error('Failed'));

    expect(dns.check(configuration)).rejects.toThrow();
});

test('check missing', async () => {
    configuration.defaultDNS = [];

    expect(await dns.check(configuration)).toBeFalsy();
});

test('check test DNS fails', async () => {
    configuration.testDNS = IPv4.fromDecimalDottedString('0.0.0.1');
    ping.mockImplementation((address) => {
        if(address === '0.0.0.1') {
            return { alive: false };
        }
        return { alive: true };
    });

    expect(await dns.check(configuration)).toBeFalsy();
});

test('check default DNS fails', async () => {
    configuration.defaultDNS = [IPv4.fromDecimalDottedString('0.0.0.1')];
    ping.mockImplementation((address) => {
        if(address === '0.0.0.1') {
            return { alive: false };
        }
        return { alive: true };
    });

    expect(await dns.check(configuration)).toBeFalsy();
});