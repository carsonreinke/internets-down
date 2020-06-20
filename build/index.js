"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var command_1 = require("./command");
var network_1 = require("./network");
var logger_1 = require("./logger");
var checks_1 = require("./checks");
var gateway_1 = require("./checks/gateway");
var interface_1 = require("./checks/interface");
var dns_1 = require("./checks/dns");
var lookup_1 = require("./checks/lookup");
var http_1 = require("./checks/http");
module.exports = function (argv, stdout, exitFn) {
    if (argv === void 0) { argv = process.argv; }
    if (stdout === void 0) { stdout = process.stdout; }
    if (exitFn === void 0) { exitFn = process.exit; }
    return __awaiter(void 0, void 0, void 0, function () {
        var options, logger, err_1, inter, err_2, configuration, checks, check, _i, checks_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger = new logger_1.default(stdout);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, command_1.default(argv)];
                case 2:
                    options = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.error(err_1);
                    exitFn(1);
                    return [2 /*return*/];
                case 4:
                    //Load the interface / configuration
                    logger.start('Loading network information');
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, network_1.currentInterface()];
                case 6:
                    inter = _a.sent();
                    return [3 /*break*/, 8];
                case 7:
                    err_2 = _a.sent();
                    logger.fail(err_2.message);
                    stdout.write("\nA check failed 🙃\n");
                    exitFn(2);
                    return [2 /*return*/];
                case 8:
                    configuration = __assign(__assign({}, options), inter);
                    logger.success();
                    checks = [
                        new interface_1.default(),
                        new gateway_1.default(),
                        new dns_1.default(),
                        new lookup_1.default(),
                        new http_1.default()
                    ];
                    _i = 0, checks_2 = checks;
                    _a.label = 9;
                case 9:
                    if (!(_i < checks_2.length)) return [3 /*break*/, 12];
                    check = checks_2[_i];
                    return [4 /*yield*/, checks_1.default(logger, check, configuration)];
                case 10:
                    if (!(_a.sent())) {
                        stdout.write("\nA check failed 🙃\n");
                        exitFn(3);
                        return [2 /*return*/];
                    }
                    _a.label = 11;
                case 11:
                    _i++;
                    return [3 /*break*/, 9];
                case 12:
                    //Done
                    stdout.write("\nAll checks passed 🙂\n");
                    return [2 /*return*/];
            }
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFDQUE2QztBQUU3QyxxQ0FBK0Q7QUFDL0QsbUNBQThCO0FBQzlCLG1DQUEyQjtBQUMzQiw0Q0FBdUM7QUFDdkMsZ0RBQTJDO0FBRTNDLG9DQUErQjtBQUMvQiwwQ0FBcUM7QUFDckMsc0NBQWlDO0FBR2pDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsVUFDYixJQUE2QixFQUM3QixNQUFpQyxFQUNqQyxNQUErQztJQUYvQyxxQkFBQSxFQUFBLE9BQWlCLE9BQU8sQ0FBQyxJQUFJO0lBQzdCLHVCQUFBLEVBQUEsU0FBbUIsT0FBTyxDQUFDLE1BQU07SUFDakMsdUJBQUEsRUFBQSxTQUFtQyxPQUFPLENBQUMsSUFBSTs7Ozs7O29CQUd6QyxNQUFNLEdBQVcsSUFBSSxnQkFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7O29CQUk1QixxQkFBTSxpQkFBTyxDQUFDLElBQUksQ0FBQyxFQUFBOztvQkFBN0IsT0FBTyxHQUFHLFNBQW1CLENBQUM7Ozs7b0JBRzlCLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBRyxDQUFDLENBQUM7b0JBQ25CLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDVixzQkFBTzs7b0JBR1gsb0NBQW9DO29CQUNwQyxNQUFNLENBQUMsS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUE7Ozs7b0JBRy9CLHFCQUFNLDBCQUFnQixFQUFFLEVBQUE7O29CQUFoQyxLQUFLLEdBQUcsU0FBd0IsQ0FBQzs7OztvQkFHakMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3pCLE1BQU0sQ0FBQyxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQztvQkFFdEMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNWLHNCQUFPOztvQkFFTCxhQUFhLHlCQUNaLE9BQU8sR0FDUCxLQUFLLENBQ1gsQ0FBQztvQkFDRixNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBR1gsTUFBTSxHQUFXO3dCQUNuQixJQUFJLG1CQUFTLEVBQUU7d0JBQ2YsSUFBSSxpQkFBTyxFQUFFO3dCQUNiLElBQUksYUFBRyxFQUFFO3dCQUNULElBQUksZ0JBQU0sRUFBRTt3QkFDWixJQUFJLGNBQUksRUFBRTtxQkFDYixDQUFDOzBCQUVrQixFQUFOLGlCQUFNOzs7eUJBQU4sQ0FBQSxvQkFBTSxDQUFBO29CQUFmLEtBQUssZUFBQTtvQkFDRCxxQkFBTSxnQkFBRyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsYUFBYSxDQUFDLEVBQUE7O29CQUE1QyxJQUFJLENBQUMsQ0FBQSxTQUF1QyxDQUFBLEVBQUU7d0JBQzFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQzt3QkFFdEMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNWLHNCQUFPO3FCQUNWOzs7b0JBTlMsSUFBTSxDQUFBOzs7b0JBU3BCLE1BQU07b0JBQ04sTUFBTSxDQUFDLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxDQUFDOzs7OztDQUM1QyxDQUFDIn0=