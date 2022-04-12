import {
    createKeyPair,
    decodeWiF,
    encodeAddress,
    encodeWiF,
    keyFromPrivate,
} from './utils';
import { Transaction } from './core';

export class Wallet {
    /**
     * Cached values for lazy-loaded getters.
     */
    #cachedAddress?: string;
    #cachedPublicKey?: string;
    #cachedPrivateKey?: string;
    #cachedWiF?: string;

    constructor(private readonly keyPair = createKeyPair()) {}

    /**
     * Address of the wallet.
     *
     * In Bitcoin, it's derived from the public key encoded in
     * base58check format to shorten the address length for readability.
     */
    get address(): string {
        return (this.#cachedAddress ??= encodeAddress(
            this.keyPair.getPublic(true, 'hex')
        ));
    }

    /**
     * Public key in hex string.
     */
    get publicKey(): string {
        return (this.#cachedPublicKey ??= this.keyPair.getPublic('hex'));
    }

    /**
     * Private key in hex string.
     */
    get privateKey(): string {
        return (this.#cachedPrivateKey ??= this.keyPair.getPrivate('hex'));
    }

    /**
     * Private key in WiF (Wallet-Import-Format) encoded string.
     */
    get WiF(): string {
        return (this.#cachedWiF ??= encodeWiF(this.privateKey));
    }

    /**
     * Sign a data with the wallet's private key.
     */
    sign(data: string): string {
        return this.keyPair.sign(data).toDER('hex');
    }

    /**
     * Create a new transaction from the wallet.
     */
    transact(to: string, amount: number): Transaction {
        // create unsigned transaction without signature
        const tx = new Transaction(this.address, to, amount);

        // sign transaction with wallet's private key
        tx.signature = this.sign(tx.hash);

        // return signed transaction
        return tx;
    }

    // STATIC METHODS //////////////////////////////////////////////////////////////////////////////

    /**
     * Create a new wallet from a private key in hex string.
     */
    static fromKey(privateKey: string): Wallet {
        return new Wallet(keyFromPrivate(privateKey));
    }

    /**
     * Load a wallet from a private key
     * in WiF (Wallet Import Format) encoded string.
     */
    static fromWiF(wif: string): Wallet {
        return Wallet.fromKey(decodeWiF(wif));
    }
}
