import bs58check from 'bs58check';

/**
 * Convert a hexadecimal string to buffer.
 */
export const hexToBuffer = (hex: string): Buffer => Buffer.from(hex, 'hex');

/**
 * Compress a hexadecimal string with base58Check encoding.
 *
 * Result is a base58Check encoded string.
 * Bitcoin address is a base58Check encoded string with length 34.
 */
export const encodeBase58Check = (data: string): string =>
    bs58check.encode(hexToBuffer(data));

/**
 * Decompress a base58Check decoded string to hexadecimal string.
 *
 * Result is a hexadecimal string.
 * Bitcoin uses base58Check encoding to convert addresses to public keys.
 */
export const decodeBase58Check = (data: string): string =>
    bs58check.decode(data).toString('hex');
