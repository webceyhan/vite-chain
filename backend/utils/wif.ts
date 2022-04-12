import bs58check from 'bs58check';
import { VERSION } from '../constants';
import { sha256 } from '../utils';

/**
 * Create checksum for a given value.
 *
 * - perform SHA-256 hash on the extended key 2 times
 * - return the first 4 bytes of the second hash.
 */
const createChecksum = (data: Buffer): Buffer =>
    sha256(sha256(data)).slice(0, 4);

/**
 * Encode a hexadecimal string to WiF string (Wallet Import Format).
 */
export const encodeWiF = (key: string): string => {
    // add version prefix in front of the private key
    const extendedKey = Buffer.concat([
        Buffer.from([VERSION]),
        Buffer.from(key, 'hex'),
    ]);

    // create checksum of the extended key
    const checksum = createChecksum(extendedKey);

    // add the checksum to the extended key
    const extendedKeyWithChecksum = Buffer.concat([extendedKey, checksum]);

    // encode the extended key with base58check
    return bs58check.encode(extendedKeyWithChecksum);
};

/**
 * Decode a WiF (Wallet Import Format) encoded string to hexadecimal string.
 */
export const decodeWiF = (wif: string): string => {
    // decode WiF with base58check
    const keyWithChecksum = bs58check.decode(wif);

    // drop the last 4 checksum bytes from the byte string.
    const key = keyWithChecksum.slice(0, -4);

    // drop the first byte (it should be 0x80)
    return key.slice(1).toString('hex').toLowerCase();
};
