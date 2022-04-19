import { ec } from 'elliptic';
import { SHA256, enc } from 'crypto-js';

const ecdsa = new ec('secp256k1');

export class WebTransaction {
    constructor(
        public from: string,
        public to: string,
        public amount: number,
        public hash: string = '',
        public signature: string = '',
        public timestamp: number = Date.now()
    ) {
        this.hash = this.calculateHash();
    }

    /**
     * Calculate the hash of the transaction.
     */
    calculateHash(): string {
        const { from, to, amount, timestamp } = this;
        return '0x' + SHA256(from + to + amount + timestamp).toString(enc.Hex);
    }
}

export class WebWallet {
    public readonly address: string;

    constructor(private keyPair = ecdsa.genKeyPair()) {
        this.address = this.keyPair.getPublic(true, 'hex');
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
    transact(to: string, amount: number): WebTransaction {
        // create unsigned transaction without signature
        const tx = new WebTransaction(this.address, to, amount);

        // sign transaction with wallet's private key
        tx.signature = this.sign(tx.hash);

        // return signed transaction
        return tx;
    }

    // STATIC METHODS //////////////////////////////////////////////////////////////////////////////

    /**
     * Create a new wallet from a private key in hex string.
     */
    static fromKey(privateKey: string): WebWallet {
        return new WebWallet(ecdsa.keyFromPrivate(privateKey, 'hex'));
    }
}
