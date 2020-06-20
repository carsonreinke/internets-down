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
exports.currentInterface = exports.currentDNS = exports.currentInternalGateway = void 0;
var os_1 = require("os");
var ip_num_1 = require("ip-num");
var defaultGateway = require("default-gateway");
var dns_1 = require("dns");
/**
 * Get the current gateway
 *
 * @returns Gateway | undefined
 */
function currentInternalGateway() {
    return __awaiter(this, void 0, void 0, function () {
        var gateway;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, defaultGateway.v4()];
                case 1:
                    gateway = _a.sent();
                    if (!gateway || !gateway.gateway) {
                        return [2 /*return*/, undefined];
                    }
                    return [2 /*return*/, {
                            address: ip_num_1.IPv4.fromDecimalDottedString(gateway.gateway),
                            interface: gateway.interface
                        }];
            }
        });
    });
}
exports.currentInternalGateway = currentInternalGateway;
/**
 *
 */
function currentDNS() {
    return dns_1.promises.getServers().map(ip_num_1.IPv4.fromDecimalDottedString);
}
exports.currentDNS = currentDNS;
/**
 * Load the network interfaces and gateway
 *
 * @returns NetworkInterface | undefined
 */
function currentInterface() {
    return __awaiter(this, void 0, void 0, function () {
        var interfaces, internalGateway, defaultDNS, found;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    interfaces = os_1.networkInterfaces();
                    return [4 /*yield*/, currentInternalGateway()];
                case 1:
                    internalGateway = _a.sent();
                    defaultDNS = currentDNS();
                    Object.keys(interfaces).forEach(function (name) {
                        //Go through all interfaces with this name
                        interfaces[name].filter(function (i) { return !i.internal && i.family === 'IPv4'; }).forEach(function (inter) {
                            //Provide the gateway if the network
                            if (internalGateway === undefined || internalGateway.interface === name) {
                                found = {
                                    name: name,
                                    address: ip_num_1.IPv4.fromDecimalDottedString(inter.address),
                                    defaultDNS: defaultDNS
                                };
                                if (internalGateway !== undefined) {
                                    found.internalGateway = internalGateway.address;
                                }
                            }
                        });
                    });
                    return [2 /*return*/, found];
            }
        });
    });
}
exports.currentInterface = currentInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV0d29yay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9uZXR3b3JrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlCQUF1RjtBQUN2RixpQ0FBOEI7QUFDOUIsZ0RBQW1EO0FBQ25ELDJCQUFzQztBQW1CdEM7Ozs7R0FJRztBQUNILFNBQXNCLHNCQUFzQjs7Ozs7d0JBQ1IscUJBQU0sY0FBYyxDQUFDLEVBQUUsRUFBRSxFQUFBOztvQkFBbkQsT0FBTyxHQUFtQixTQUF5QjtvQkFFekQsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7d0JBQzlCLHNCQUFPLFNBQVMsRUFBQztxQkFDcEI7b0JBRUQsc0JBQU87NEJBQ0gsT0FBTyxFQUFFLGFBQUksQ0FBQyx1QkFBdUIsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDOzRCQUN0RCxTQUFTLEVBQUUsT0FBTyxDQUFDLFNBQVM7eUJBQy9CLEVBQUM7Ozs7Q0FDTDtBQVhELHdEQVdDO0FBRUQ7O0dBRUc7QUFDSCxTQUFnQixVQUFVO0lBQ3RCLE9BQU8sY0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxhQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztBQUM5RCxDQUFDO0FBRkQsZ0NBRUM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBc0IsZ0JBQWdCOzs7Ozs7b0JBQzVCLFVBQVUsR0FBd0Msc0JBQWlCLEVBQUUsQ0FBQztvQkFDM0MscUJBQU0sc0JBQXNCLEVBQUUsRUFBQTs7b0JBQXpELGVBQWUsR0FBWSxTQUE4QjtvQkFDekQsVUFBVSxHQUFXLFVBQVUsRUFBRSxDQUFDO29CQUd4QyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQVk7d0JBQ3pDLDBDQUEwQzt3QkFDMUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsTUFBTSxLQUFLLE1BQU0sRUFBbEMsQ0FBa0MsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQStCOzRCQUNyRyxvQ0FBb0M7NEJBQ3BDLElBQUksZUFBZSxLQUFLLFNBQVMsSUFBSSxlQUFlLENBQUMsU0FBUyxLQUFLLElBQUksRUFBRTtnQ0FDckUsS0FBSyxHQUFHO29DQUNKLElBQUksTUFBQTtvQ0FDSixPQUFPLEVBQUUsYUFBSSxDQUFDLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7b0NBQ3BELFVBQVUsWUFBQTtpQ0FDYixDQUFDO2dDQUNGLElBQUksZUFBZSxLQUFLLFNBQVMsRUFBRTtvQ0FDL0IsS0FBSyxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUMsT0FBTyxDQUFBO2lDQUNsRDs2QkFDSjt3QkFDTCxDQUFDLENBQUMsQ0FBQztvQkFDUCxDQUFDLENBQUMsQ0FBQztvQkFFSCxzQkFBTyxLQUFLLEVBQUM7Ozs7Q0FDaEI7QUF4QkQsNENBd0JDIn0=