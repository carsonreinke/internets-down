"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseIP = void 0;
var ip_num_1 = require("ip-num");
function parseIP(address) {
    if (ip_num_1.Validator.isValidIPv4String(address)[0]) {
        return ip_num_1.IPv4.fromDecimalDottedString(address);
    }
    else if (ip_num_1.Validator.isValidIPv6String(address)[0]) {
        return ip_num_1.IPv6.fromHexadecatet(address);
    }
    else {
        throw new Error('Not a valid IPv4 or IPv6 address');
    }
}
exports.parseIP = parseIP;
;
//# sourceMappingURL=common.js.map