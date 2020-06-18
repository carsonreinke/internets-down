import Gateway from '../../src/checks/gateway';

jest.mock('pingman');
const ping = require('pingman');

let gateway;

beforeEach(() => {
    gateway = new Gateway();

    ping.mockResolvedValue({});
});

test('check', async () => {
    ping.mockResolvedValue({ alive: true });

    const result = await gateway.check({ dns: '0.0.0.0', hostname: 'example.com', internalGateway: '0.0.0.0' });

    expect(result).toBeTruthy();
});

test('check missing gateway', async () => {
    const result = await gateway.check({ dns: '0.0.0.0', hostname: 'example.com' });

    expect(result).toBeFalsy();
});

test('check not alive', async () => {
    ping.mockResolvedValue({ alive: false });

    const result = await gateway.check({ dns: '0.0.0.0', hostname: 'example.com', internalGateway: '0.0.0.0' });

    expect(result).toBeFalsy();
});

test('check error', async () => {
    ping.mockRejectedValue(new Error('Failed'));

    expect(gateway.check({ dns: '0.0.0.0', hostname: 'example.com', internalGateway: '0.0.0.0' }))
        .rejects.toThrow();
});