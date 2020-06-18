//import chalk from 'chalk';
import { Writable } from 'stream';
import ora = require('ora');

export default class Logger {
    private stdout: Writable;
    private ora: ora.Ora | null;

    /**
     * 
     * @param stdout 
     */
    constructor(stdout: Writable) {
        this.stdout = stdout;
        this.ora = null;
    }

    start(text: string): void {
        this.ora = ora({
            text: text,
            stream: this.stdout
        });
        this.ora.start();
    }

    success(text?: string) {
        this.ora.succeed(text);
        this.ora = null;
    }

    fail(text?: string): void {
        this.ora.fail(text);
        this.ora = null;
    }
}