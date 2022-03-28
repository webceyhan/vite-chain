import { createHash as _createHash } from 'crypto';

/**
 * Generate a sha256 hash from a string.
 * Result is a hexadecimal string with length 64.
 */
export const createHash = (str: string) =>
    _createHash('sha256').update(str).digest('hex');
