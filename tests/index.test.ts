
import { IPv4 } from 'ip-num';
import streams = require('memory-streams');
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
    network.currentInterface.mockResolvedValue({
        name: 'custom0',
        address: IPv4.fromDecimalDottedString('0.0.0.0'),
        defaultDNS: []
    } as NetworkInterface);
    run.default.mockResolvedValue(true);
    command.default.mockResolvedValue({
        testDNS: IPv4.fromDecimalDottedString('0.0.0.0'),
        hostname: 'example.com',
        externalGateway: IPv4.fromDecimalDottedString('0.0.0.0')
    } as Options);
    console.error = jest.fn();

    sink = new streams.WritableStream();
    mockExit = jest.fn().mockReturnValue(undefined as never);
    jest.spyOn(process.stdout, 'write').mockReturnValue(true);
    jest.spyOn(process, 'exit').mockReturnValue(undefined as never);
});

test('run', async () => {
    await index(['', ''], sink, mockExit);
    expect(mockExit).not.toHaveBeenCalled();
    expect(network.currentInterface).toHaveBeenCalled();
});

test('command failed', async () => {
    command.default.mockRejectedValue(new Error('Failed'));

    await index(['', ''], sink, mockExit);

    expect(command.default).toHaveBeenCalled();
    expect(mockExit).toHaveBeenCalledWith(1);
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