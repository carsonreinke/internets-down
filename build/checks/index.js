"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * @param logger
 * @param check
 * @param configuration
 */
function run(logger, check, configuration) {
    return __awaiter(this, void 0, void 0, function () {
        var result, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger.start("Checking " + check.name);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, check.check(configuration)];
                case 2:
                    result = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    logger.fail("Failed checking " + check.name + ": " + err_1.message);
                    return [2 /*return*/, false];
                case 4:
                    //Update logger with result of check
                    if (result) {
                        logger.success();
                        return [2 /*return*/, true];
                    }
                    else {
                        logger.fail("Failed checking " + check.name);
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = run;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY2hlY2tzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSUE7Ozs7O0dBS0c7QUFDSCxTQUE4QixHQUFHLENBQUMsTUFBYyxFQUFFLEtBQVcsRUFBRSxhQUE0Qjs7Ozs7O29CQUd2RixNQUFNLENBQUMsS0FBSyxDQUFDLGNBQVksS0FBSyxDQUFDLElBQU0sQ0FBQyxDQUFDOzs7O29CQUkxQixxQkFBTSxLQUFLLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxFQUFBOztvQkFBekMsTUFBTSxHQUFHLFNBQWdDLENBQUM7Ozs7b0JBRzFDLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQW1CLEtBQUssQ0FBQyxJQUFJLFVBQUssS0FBRyxDQUFDLE9BQVMsQ0FBQyxDQUFBO29CQUM1RCxzQkFBTyxLQUFLLEVBQUM7O29CQUdqQixvQ0FBb0M7b0JBQ3BDLElBQUksTUFBTSxFQUFFO3dCQUNSLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQzt3QkFDakIsc0JBQU8sSUFBSSxFQUFDO3FCQUNmO3lCQUNJO3dCQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQW1CLEtBQUssQ0FBQyxJQUFNLENBQUMsQ0FBQzt3QkFDN0Msc0JBQU8sS0FBSyxFQUFDO3FCQUNoQjs7Ozs7Q0FDSjtBQXZCRCxzQkF1QkMifQ==