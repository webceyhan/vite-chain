import { ROOT_ADDRESS, TRANSACTION_COMMISION } from '../constants';
import { sha256 } from '../utils';

/**
 * The type of a transaction.
 *
 * There are three types of transactions:
 * - `coinbase`: a transaction that sends coins to the network.
 * - `transfer`: a transaction that sends coins from one account to another.
 * - `vote`: a transaction that votes for a candidate. (not implemented yet!)
 */
export type TransactionType = 'coinbase' | 'transfer';

export class Transaction {
    /**
     * Unique hash string representing the transaction.
     */
    public hash: string;

    constructor(
        /**
         * Sender address of the transaction.
         */
        public from: string,

        /**
         * Recipient address of the transaction.
         */
        public to: string,

        /**
         * Amount of the transaction.
         */
        public amount: number,

        /**
         * Signature of the transaction signed by the sender.
         *
         * It is required to verify the transaction made by the sender.
         * If not provided, it will be considered as coinbase transaction
         * which was created by the node for mining rewards.
         */
        public signature: string = '',

        /**
         * Timestamp on which the transaction was created.
         */
        public timestamp: number = Date.now()
    ) {
        // set calculated hash
        this.hash = this.calculateHash();
    }

    /**
     * Flag if transaction is coinbase transaction.
     */
    get isCoinbase(): boolean {
        return this.from === ROOT_ADDRESS;
    }

    /**
     * Type of the transaction.
     */
    get type(): TransactionType {
        return this.isCoinbase ? 'coinbase' : 'transfer';
    }

    /**
     * Transaction fee calculated from the amount.
     *
     * There is no fee for coinbase transactions
     * which are created by the node for mining rewards.
     */
    get fee(): number {
        return this.isCoinbase ? 0 : this.amount * TRANSACTION_COMMISION;
    }

    /**
     * Calculate the hash of the transaction.
     */
    calculateHash(): string {
        return sha256(this.from + this.to + this.amount + this.timestamp);
    }
}
