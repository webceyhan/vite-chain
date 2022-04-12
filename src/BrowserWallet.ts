import { ec } from 'elliptic';
import bs58check from 'bs58check';
// import { Sha256 } from '@aws-crypto/sha256-browser';

const EC = new ec('secp256k1');

// export class BrowserTransaction {
//     constructor(
//         public from: string,
//         public to: string,
//         public amount: number,
//         public hash: string = '',
//         public signature: string = '',
//         public timestamp: number = Date.now()
//     ) {
//         // set calculated hash in asnyc manner
//         // because browser API doesn't support sync hashing
//         this.calculateHash().then((hash) => (this.hash = hash));
//     }

//     /**
//      * Calculate the hash of the transaction.
//      */
//     async calculateHash(): Promise<string> {
//         const hash = new Sha256();
//         const { from, to, amount, timestamp } = this;
//         hash.update(from + to + amount + timestamp);
//         return (await hash.digest()).toString();
//     }
// }

export class BrowserWallet {
    public readonly address: string;
    public readonly publicKey: string;

    constructor(private keyPair = EC.genKeyPair()) {        
        // initialize cached wallet properties
        this.publicKey = this.keyPair.getPublic(true, 'hex');
        this.address = bs58check.encode(this.keyPair.getPublic(true, 'array'));
    }

    /**
     * Wallet private key in hex string.
     */
    get privateKey(): string {
        return this.keyPair.getPrivate('hex');
    }

    /**
     * Sign a data with the wallet's private key.
     */
    sign(data: string): string {
        return this.keyPair.sign(data).toDER('hex');
    }

    // /**
    //  * Create a new transaction from the wallet.
    //  */
    // transact(to: string, amount: number): BrowserTransaction {
    //     // create unsigned transaction without signature
    //     const tx = new BrowserTransaction(this.address, to, amount);

    //     // sign transaction with wallet's private key
    //     tx.signature = this.sign(tx.hash);

    //     // return signed transaction
    //     return tx;
    // }

    // STATIC METHODS //////////////////////////////////////////////////////////////////////////////

    /**
     * Create a new wallet from a private key in hex string.
     */
    static fromKey(privateKey: string): BrowserWallet {
        return new BrowserWallet(EC.keyFromPrivate(privateKey, 'hex'));
    }
}
