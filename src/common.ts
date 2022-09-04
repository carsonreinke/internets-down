import { IPv4, IPv6, Validator } from 'ip-num';

export type IP = IPv4 | IPv6;

export function parseIP(address: string): IP {
  if(Validator.isValidIPv4String(address)[0]) {
    return IPv4.fromDecimalDottedString(address);
  }
  else if(Validator.isValidIPv6String(address)[0]) {
    return IPv6.fromHexadecimalString(address);
  }
  else {
    throw new Error('Not a valid IPv4 or IPv6 address');
  }
};