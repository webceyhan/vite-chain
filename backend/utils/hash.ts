import { createHash as _createHash } from 'crypto';

/**
 * Generate a sha256 hash from a value.
 */
export const sha256 = (value: any) =>
    _createHash('sha256').update(value).digest();

/**
 * Generate a ripeMD160 hash from a value.
 */
export const ripeMD160 = (value: any) =>
    _createHash('ripemd160').update(value).digest();

/**
 * Generate '0x' prefixed hexadecimal hash string from a value.
 */
export const createHash = (value: any): string =>
    '0x' + sha256(value).toString('hex');
