"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ora = require("ora");
var Logger = /** @class */ (function () {
    /**
     *
     * @param stdout
     */
    function Logger(stdout) {
        this.stdout = stdout;
        this.ora = null;
    }
    Logger.prototype.start = function (text) {
        this.ora = ora({
            text: text,
            stream: this.stdout
        });
        this.ora.start();
    };
    Logger.prototype.success = function (text) {
        this.ora.succeed(text);
        this.ora = null;
    };
    Logger.prototype.fail = function (text) {
        this.ora.fail(text);
        this.ora = null;
    };
    return Logger;
}());
exports.default = Logger;
//# sourceMappingURL=logger.js.map