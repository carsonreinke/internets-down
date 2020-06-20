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
var commander_1 = require("commander");
var ip_num_1 = require("ip-num");
var version_1 = require("./version");
/**
 * Parse the string into IPv4 format
 *
 * @param value
 * @returns IPv4
 */
function parseIP(value) {
    return ip_num_1.IPv4.fromDecimalDottedString(value);
}
function default_1(argv) {
    return __awaiter(this, void 0, void 0, function () {
        var program, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    program = new commander_1.Command();
                    //Get the version directly from this package
                    _b = (_a = program).version;
                    return [4 /*yield*/, version_1.default()];
                case 1:
                    //Get the version directly from this package
                    _b.apply(_a, [_c.sent()]);
                    //Options
                    program.option('--dns <ip>', 'Additional DNS server to check', parseIP, ip_num_1.IPv4.fromDecimalDottedString('1.1.1.1'));
                    program.option('--gateway <ip>', 'External gateway to check', parseIP);
                    program.option('--hostname <host>', 'Hostname to check', 'example.com');
                    //Parse the provided arguments
                    return [4 /*yield*/, program.parseAsync(argv)];
                case 2:
                    //Parse the provided arguments
                    _c.sent();
                    return [2 /*return*/, { testDNS: program.dns, hostname: program.hostname, externalGateway: program.gateway }];
            }
        });
    });
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQW9DO0FBRXBDLGlDQUE4QjtBQUM5QixxQ0FBZ0M7QUFRaEM7Ozs7O0dBS0c7QUFDSCxTQUFTLE9BQU8sQ0FBQyxLQUFhO0lBQzFCLE9BQU8sYUFBSSxDQUFDLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQy9DLENBQUM7QUFFRCxtQkFBK0IsSUFBYzs7Ozs7O29CQUNuQyxPQUFPLEdBQXNCLElBQUksbUJBQU8sRUFBRSxDQUFDO29CQUVqRCw0Q0FBNEM7b0JBQzVDLEtBQUEsQ0FBQSxLQUFBLE9BQU8sQ0FBQSxDQUFDLE9BQU8sQ0FBQTtvQkFBQyxxQkFBTSxpQkFBTyxFQUFFLEVBQUE7O29CQUQvQiw0Q0FBNEM7b0JBQzVDLGNBQWdCLFNBQWUsRUFBQyxDQUFDO29CQUVqQyxTQUFTO29CQUNULE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLGdDQUFnQyxFQUFFLE9BQU8sRUFBRSxhQUFJLENBQUMsdUJBQXVCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztvQkFDakgsT0FBTyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSwyQkFBMkIsRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFDdkUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRSxtQkFBbUIsRUFBRSxhQUFhLENBQUMsQ0FBQztvQkFFeEUsOEJBQThCO29CQUM5QixxQkFBTSxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFBOztvQkFEOUIsOEJBQThCO29CQUM5QixTQUE4QixDQUFDO29CQUUvQixzQkFBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFLGVBQWUsRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUM7Ozs7Q0FDakc7QUFmRCw0QkFlQyJ9