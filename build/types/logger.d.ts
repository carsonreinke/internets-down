/// <reference types="node" />
import { Writable } from 'stream';
export default class Logger {
    private stdout;
    private ora;
    /**
     *
     * @param stdout
     */
    constructor(stdout: Writable);
    start(text: string): void;
    success(text?: string): void;
    fail(text?: string): void;
}
