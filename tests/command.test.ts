import command, { Options } from '../src/command';
import { IPv4, IPv6 } from 'ip-num';

let mockExit, mockStdout;

beforeEach(() => {
    console.error = jest.fn();
    console.log = jest.fn();
    mockStdout = jest.spyOn(process.stdout, 'write').mockReturnValue(true);
    mockExit = jest.spyOn(process, 'exit').mockReturnValue(undefined as never);
});

test('help', async () => {
    await command(['', '', '--help']);
    expect(mockExit).toHaveBeenCalledWith(0);
});

test('wrong option', async () => {
    await command(['', '', '--fake']);
    expect(mockExit).toHaveBeenCalledWith(1);
});

test('default option', async () => {
    const options = await command(['', '']);
    expect(options.testDNS).toBeInstanceOf(IPv4);
    expect(typeof(options.hostname)).toEqual('string');
});

test('dns option', async () => {
    const options = await command(['', '', '--dns', '0.0.0.0']);
    expect(mockExit).not.toHaveBeenCalled();
    expect(options.testDNS).toEqual(IPv4.fromDecimalDottedString('0.0.0.0'));
});

test('dns option ipv6', async () => {
    const options = await command(['', '', '--dns', 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff']);
    expect(mockExit).not.toHaveBeenCalled();
    expect(options.testDNS).toEqual(IPv6.fromHexadecimalString('ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff'));
});

test('invalid dns option', async () => {
    await expect(command(['', '', '--dns', '0.0.0'])).rejects.toThrow();
    await expect(command(['', '', '--dns', 'ffff'])).rejects.toThrow();
});

test('gateway option', async () => {
    const options: Options = await command(['', '', '--gateway', '0.0.0.0']);
    expect(mockExit).not.toHaveBeenCalled();
    expect(options.externalGateway).toEqual(IPv4.fromDecimalDottedString('0.0.0.0'));
});

test('gateway option ipv6', async () => {
    const options: Options = await command(['', '', '--gateway', 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff']);
    expect(mockExit).not.toHaveBeenCalled();
    expect(options.externalGateway).toEqual(IPv6.fromHexadecimalString('ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff'));
});

test('invalid gateway option', async () => {
    await expect(command(['', '', '--gateway', '0.0.0'])).rejects.toThrow();
    await expect(command(['', '', '--gateway', 'ffff'])).rejects.toThrow();
});

test('version', async () => {
    await command(['', '', '--version']);

    expect(mockStdout).toHaveBeenCalled();
    expect(mockStdout.mock.calls[0][0]).toMatch(/\d+\.\d+\.\d+/);
});