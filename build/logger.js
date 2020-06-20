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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2xvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLHlCQUE0QjtBQUU1QjtJQUlJOzs7T0FHRztJQUNILGdCQUFZLE1BQWdCO1FBQ3hCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxzQkFBSyxHQUFMLFVBQU0sSUFBWTtRQUNkLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQ1gsSUFBSSxFQUFFLElBQUk7WUFDVixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07U0FDdEIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsd0JBQU8sR0FBUCxVQUFRLElBQWE7UUFDakIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7SUFDcEIsQ0FBQztJQUVELHFCQUFJLEdBQUosVUFBSyxJQUFhO1FBQ2QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7SUFDcEIsQ0FBQztJQUNMLGFBQUM7QUFBRCxDQUFDLEFBOUJELElBOEJDIn0=