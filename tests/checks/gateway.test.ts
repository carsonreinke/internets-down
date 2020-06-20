import Gateway from '../../src/checks/gateway';
import Configuration from '../../src/configuration';
import { IPv4 } from 'ip-num';

jest.mock('pingman');
const ping = require('pingman');

let gateway: Gateway,
    configuration: Configuration;

beforeEach(() => {
    gateway = new Gateway();
    configuration = { 
        defaultDNS: [], 
        testDNS: IPv4.fromDecimalDottedString('0.0.0.0'), 
        hostname: 'example.com', 
        internalGateway: IPv4.fromDecimalDottedString('0.0.0.0') 
    };

    ping.mockResolvedValue({});
});

test('check', async () => {
    ping.mockResolvedValue({ alive: true });

    const result = await gateway.check(configuration);

    expect(result).toBeTruthy();
    expect(ping).toHaveBeenCalled();
});

test('check missing internal gateway', async () => {
    configuration.internalGateway = undefined;

    const result = await gateway.check(configuration);

    expect(result).toBeFalsy();
});

test('check not alive', async () => {
    ping.mockResolvedValue({ alive: false });

    const result = await gateway.check(configuration);

    expect(result).toBeFalsy();
});

test('check error', async () => {
    ping.mockRejectedValue(new Error('Failed'));

    expect(gateway.check(configuration)).rejects.toThrow();
});