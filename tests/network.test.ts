import { currentInterface } from '../src/network';
import { IPv4, IPv6 } from 'ip-num';

jest.mock('os');
const os = require('os');
jest.mock('default-gateway');
const defaultGateway = require('default-gateway');

jest.mock('dns');
const dns = require('dns');

//Need to force mocking of property `promises` on `dns`
const mockDns = {
    getServers: jest.fn().mockReturnValue([]),
};
Object.defineProperty(dns, 'promises', {
    get: () => mockDns
});

beforeEach(() => {
    defaultGateway.v4.mockResolvedValue(undefined);
    defaultGateway.v6.mockRejectedValue(new Error('Unable to determine default gateway'));
});

test('load empty', async () => {
    os.networkInterfaces.mockReturnValue({});

    expect(await currentInterface()).toBeUndefined();
});

test('load', async () => {
    os.networkInterfaces.mockReturnValue({
        'custom0': [{
            address: '0.0.0.0',
            internal: false,
            family: 'IPv4'
        }]
    });

    const inter = await currentInterface();
    expect(inter).not.toBeUndefined();
    expect(inter?.name).toEqual('custom0');
});

test('load ipv6', async () => {
    os.networkInterfaces.mockReturnValue({
        'custom0': [{
            address: 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff',
            internal: false,
            family: 'IPv6'
        }]
    });

    const inter = await currentInterface();
    expect(inter).not.toBeUndefined();
    expect(inter?.name).toEqual('custom0');
});

test('load non-internal', async () => {
    os.networkInterfaces.mockReturnValue({
        'custom0': [{
            address: '0.0.0.0',
            internal: true,
            family: 'IPv4'
        }]
    });

    expect(await currentInterface()).toBeUndefined();
});

test('load gateway', async () => {
    os.networkInterfaces.mockReturnValue({
        'custom0': [{
            address: '0.0.0.0',
            internal: false,
            family: 'IPv4'
        }]
    });
    defaultGateway.v4.mockResolvedValue({ gateway: '0.0.0.1', interface: 'custom0' });

    const inter = await currentInterface();
    expect(inter).not.toBeUndefined();
    expect(inter?.internalGateway).toEqual(IPv4.fromDecimalDottedString('0.0.0.1'));
});

test('load gateway ipv6', async () => {
    os.networkInterfaces.mockReturnValue({
        'custom0': [{
            address: 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff',
            internal: false,
            family: 'IPv6'
        }]
    });
    defaultGateway.v6.mockResolvedValue({ gateway: '::ffff:0:1', interface: 'custom0' });

    const inter = await currentInterface();
    expect(inter).not.toBeUndefined();
    expect(inter?.internalGateway).toEqual(IPv6.fromHexadecatet('::ffff:0:1'));
});

test('gateway failed', async () => {
    os.networkInterfaces.mockReturnValue({
        'custom0': [{
            address: '0.0.0.0',
            internal: false,
            family: 'IPv4'
        }]
    });
    defaultGateway.v4.mockRejectedValue(new Error('Failed'));

    expect(currentInterface()).rejects.toThrow();
});