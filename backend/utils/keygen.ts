import { ec } from 'elliptic';

// define the elliptic curve
const ecdsa = new ec('secp256k1');

/**
 * Key-pair object type.
 */
export interface KeyPair extends ec.KeyPair {}

/**
 * Create new private / public key-pair object.
 *
 * To convert private key to hexadecimal string use:
 *  - keyPair.getPrivateKey('hex')
 *
 * To convert public key to compact hexadecimal string use:
 *  - keyPair.getPublicKey(true, 'hex')
 */
export const createKeyPair = (): KeyPair => ecdsa.genKeyPair();

/**
 * Create new key-pair object from private key in hex string.
 */
export const keyFromPrivate = (key: string): KeyPair =>
    ecdsa.keyFromPrivate(key, 'hex');

/**
 * Create new key-pair object from public key in hex string.
 * This is only needed for verifying signatures.
 */
export const keyFromPublic = (key: string): KeyPair =>
    ecdsa.keyFromPublic(key, 'hex');

/**
 * Verify a signture of data with corresponding public key.
 */
export const verifySignature = (
    key: string,
    data: string,
    signature: string
): boolean => {
    try {
        return keyFromPublic(key).verify(data, signature);
    } catch (error) {
        // ignore errors
        return false;
    }
};
