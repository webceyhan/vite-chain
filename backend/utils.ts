import { createHash as _createHash } from 'crypto';
import { ec } from 'elliptic';

/**
 * Get delay in seconds.
 */
export const delay = (second: number) =>
    new Promise<void>((resolve) => setTimeout(resolve, second * 1000));

/**
 * Generate a sha256 hash from a string.
 * Result is a hexadecimal string with length 64.
 */
export const createHash = (str: string) =>
    _createHash('sha256').update(str).digest('hex');

// KEY-PAIR HELPERS ////////////////////////////////////////////////////////////////////////////////

// define the elliptic curve
const EC = new ec('secp256k1');

// define key-pair object type
export interface KeyPair extends ec.KeyPair {}

/**
 * Create new key-pair object from private key in hex string.
 */
export const keyFromPrivate = (key: string): KeyPair =>
    EC.keyFromPrivate(key, 'hex');

/**
 * Create new private / public key-pair object.
 *
 * To convert private key to hexadecimal string use:
 *  - keyPair.getPrivateKey('hex')
 *
 * To convert public key to compact hexadecimal string use:
 *  - keyPair.getPublicKey(true, 'hex')
 */
export const createKeyPair = (): KeyPair => EC.genKeyPair();

/**
 * Create a signature from a private key and data.
 */
export const createSignature = (key: string, data: string): string =>
    EC.keyFromPrivate(key, 'hex').sign(data).toDER('hex');

/**
 * Verify a signture of data with corresponding public key.
 */
export const verifySignature = (
    key: string,
    data: string,
    signature: string
): boolean => {
    try {
        return EC.keyFromPublic(key, 'hex').verify(data, signature);
    } catch (error) {
        // ignore errors
        return false;
    }
};
