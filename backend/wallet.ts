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
     * Address of the wallet.
     *
     * It's derived from the public key encoded in base58check format
     * to shorten the address length for easier readability.
     */
    public readonly address: string;

    /**
     * Wallet public key in compact hex string.
     */
    public readonly publicKey: string;

    constructor(private keyPair = createKeyPair()) {
        // initialize cached wallet properties
        this.publicKey = this.keyPair.getPublic(true, 'hex');
        this.address = encodeAddress(this.publicKey);
    }

    /**
     * Wallet private key in hex string.
     */
    get privateKey(): string {
        return this.keyPair.getPrivate('hex');
    }

    /**
     * Private key in WiF (Wallet-Import-Format) encoded string.
     */
    get WIF(): string {
        return encodeWiF(this.privateKey);
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
    static fromWIF(wif: string): Wallet {
        return Wallet.fromKey(decodeWiF(wif));
    }
}
