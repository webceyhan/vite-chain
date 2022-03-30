import {
    createKeyPair,
    decodeBase58Check,
    encodeBase58Check,
    keyFromPrivate,
} from '../utils';
import { Transaction } from './Transaction';

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
        this.address = encodeBase58Check(this.publicKey);
    }

    /**
     * Wallet private key in hex string.
     */
    get privateKey(): string {
        return this.keyPair.getPrivate('hex');
    }

    /**
     * Wallet private key in WIF string
     * (Wallet Import Format) encoded with base58check.
     */
    get WIF(): string {
        return encodeBase58Check(this.privateKey);
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
     * Create a new wallet from a private key in WIF string
     * (Wallet Import Format) encoded with base58check.
     */
    static fromWIF(wif: string): Wallet {
        return Wallet.fromKey(decodeBase58Check(wif));
    }
}
