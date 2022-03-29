import { ROOT_ADDRESS, TRANSACTION_COMMISION } from '../constants';
import { createHash } from '../utils';

export type TransactionType = 'coinbase' | 'transfer';

export class Transaction {
    /**
     * Cached hash of the transaction.
     */
    private cachedHash?: string;

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
         * Timestamp on which the transaction was created.
         */
        public timestamp: number = Date.now()
    ) {}

    /**
     * Unique hash string representing the transaction.
     */
    get hash(): string {
        return (this.cachedHash ??= this.calculateHash());
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
        return createHash(this.from + this.to + this.amount + this.timestamp);
    }
}
