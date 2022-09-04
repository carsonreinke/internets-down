
import { IPv4, IPv6 } from 'ip-num';
import * as streams from 'memory-streams';
import { Writable } from 'stream';
import { NetworkInterface } from '../src/network';
import { Options } from '../src/command';
const index = require('../src');

jest.mock('../src/network');
const network = require('../src/network');
jest.mock('../src/checks');
const run = require('../src/checks');
jest.mock('../src/command');
const command = require('../src/command');

let mockExit: Function, 
    sink: Writable;

beforeEach(() => {
    run.default.mockResolvedValue(true);
    console.error = jest.fn();
    
    sink = new streams.WritableStream();
    mockExit = jest.fn().mockReturnValue(undefined as never);
    jest.spyOn(process.stdout, 'write').mockReturnValue(true);
    jest.spyOn(process, 'exit').mockReturnValue(undefined as never);
});

test('command failed', async () => {
    command.default.mockRejectedValue(new Error('Failed'));

    await index(['', ''], sink, mockExit);

    expect(command.default).toHaveBeenCalled();
    expect(mockExit).toHaveBeenCalledWith(1);
});

describe('ipv4', () => {
    beforeEach(() => {
        network.currentInterface.mockResolvedValue({
            name: 'custom0',
            address: IPv4.fromDecimalDottedString('0.0.0.0'),
            defaultDNS: []
        } as NetworkInterface);
        
        command.default.mockResolvedValue({
            testDNS: IPv4.fromDecimalDottedString('0.0.0.0'),
            hostname: 'example.com',
            externalGateway: IPv4.fromDecimalDottedString('0.0.0.0')
        } as Options);
    });

    test('run', async () => {
        await index(['', ''], sink, mockExit);
        expect(mockExit).not.toHaveBeenCalled();
        expect(network.currentInterface).toHaveBeenCalled();
    });

    test('network interface failed', async () => {
        network.currentInterface.mockRejectedValue(new Error('Failed'));

        await index(['', ''], sink, mockExit);

        expect(network.currentInterface).toHaveBeenCalled();
        expect(mockExit).toHaveBeenCalledWith(2);
    });

    test('check failed', async () => {
        run.default.mockResolvedValue(false);

        await index(['', ''], sink, mockExit);

        expect(command.default).toHaveBeenCalled();
        expect(mockExit).toHaveBeenCalledWith(3);
    });
});

describe('ipv6', () => {
    beforeEach(() => {
        network.currentInterface.mockResolvedValue({
            name: 'custom0',
            address: IPv6.fromHexadecimalString('ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff'),
            defaultDNS: []
        } as NetworkInterface);
        
        command.default.mockResolvedValue({
            testDNS: IPv6.fromHexadecimalString('ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff'),
            hostname: 'example.com',
            externalGateway: IPv6.fromHexadecimalString('ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff')
        } as Options);
    });

    test('run', async () => {
        await index(['', ''], sink, mockExit);
        expect(mockExit).not.toHaveBeenCalled();
        expect(network.currentInterface).toHaveBeenCalled();
    });

    test('network interface failed', async () => {
        network.currentInterface.mockRejectedValue(new Error('Failed'));

        await index(['', ''], sink, mockExit);

        expect(network.currentInterface).toHaveBeenCalled();
        expect(mockExit).toHaveBeenCalledWith(2);
    });

    test('check failed', async () => {
        run.default.mockResolvedValue(false);

        await index(['', ''], sink, mockExit);

        expect(command.default).toHaveBeenCalled();
        expect(mockExit).toHaveBeenCalledWith(3);
    });
});