import bs58check from 'bs58check';
import { COIN_SYMBOL } from '../constants';

/**
 * Prefix of the addres string (2 characters).
 */
const PREFIX = COIN_SYMBOL.toLowerCase().slice(0, -1);

/**
 * Convert a hexadecimal public key to a compressed address string.
 * The result is a base58check encoded string with the prefix.
 *
 * Bitcoin address is a base58Check encoded string with length 34.
 */
export const encodeAddress = (key: string): string =>
    PREFIX + bs58check.encode(Buffer.from(key, 'hex'));

/**
 * Convert a compressed address string to a hexadecimal public key.
 * The input is a base58check encoded string with the prefix.
 *
 * Bitcoin uses base58Check encoding to convert addresses to public keys.
 */
export const decodeAddress = (key: string): string =>
    bs58check.decode(key.slice(PREFIX.length)).toString('hex');

/**
 * Check if a string is a valid address and has length of 52.
 */
export const isAddress = (key: string): boolean =>
    key.length === 52 && key.startsWith(PREFIX);
