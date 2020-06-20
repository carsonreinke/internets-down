import Logger from '../src/logger';
import streams = require('memory-streams');
import { Writable } from 'stream';

let sink: Writable,
    logger: Logger;

beforeEach(() => {
    sink = new streams.WritableStream();
    logger = new Logger(sink);
});

test('start', () => {
    logger.start('Test');

    expect(sink.toString()).toMatch('Test');
});

test('fail', () => {
    logger.start('Test');
    logger.fail('Failed');

    expect(sink.toString()).toMatch('Test');
    expect(sink.toString()).toMatch('Failed');
});

test('success', () => {
    logger.start('Test');
    logger.success('Success');

    expect(sink.toString()).toMatch('Test');
    expect(sink.toString()).toMatch('Success');
});