import run from '../../src/checks';
import Base from '../../src/checks/base';
import Logger from '../../src/logger';
import streams = require('memory-streams');
import { IPv4 } from 'ip-num';
import Configuration from '../../src/configuration';

class Fake extends Base {
    constructor() {
        super('test');
    }

    check() {
        return Promise.resolve(true);
    }
}

let logger,
    sink: streams.WritableStream,
    check,
    spyCheck: jest.SpyInstance;
const configuration: Configuration = {
    defaultDNS: [],
    testDNS: IPv4.fromDecimalDottedString('0.0.0.0'),
    hostname: 'example.com'
};

beforeEach(() => {
    sink = new streams.WritableStream();
    logger = new Logger(sink);
    check = new Fake();
    spyCheck = jest.spyOn(check, 'check');
});

test('run', async () => {
    expect(await run(logger, check, configuration)).toBeTruthy();
    expect(sink.toString()).toMatch(/test/);
    expect(spyCheck).toHaveBeenCalled();
});

test('run fail', async () => {
    spyCheck.mockReturnValue(false);
    expect(await run(logger, check, configuration)).toBeFalsy();
});

test('run error', async () => {
    spyCheck.mockRejectedValue(new Error('unique'));
    expect(await run(logger, check, configuration)).toBeFalsy();
    expect(sink.toString()).toMatch(/unique/);
});