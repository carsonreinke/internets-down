import Configuration from '../../src/configuration';
import { IPv4 } from 'ip-num';
import Interface from '../../src/checks/interface';

let inter: Interface,
    configuration: Configuration;

beforeEach(() => {
    inter = new Interface();
    configuration = {
        address: IPv4.fromDecimalDottedString('0.0.0.0'),
        defaultDNS: [IPv4.fromDecimalDottedString('0.0.0.0')],
        testDNS: IPv4.fromDecimalDottedString('0.0.0.0'),
        hostname: 'example.com',
        internalGateway: IPv4.fromDecimalDottedString('0.0.0.0')
    };
});

test('check', async () => {
    const result = await inter.check(configuration);

    expect(result).toBeTruthy();
});

test('check missing', async () => {
    configuration.address = undefined;

    const result = await inter.check(configuration);

    expect(result).toBeFalsy();
});