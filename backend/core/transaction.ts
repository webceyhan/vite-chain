import { ROOT_ADDRESS } from '../constants';
import { createHash } from '../utils';

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
     * Transaction commission percentage to calculate the fee
     * by multiplying with the amount of the transaction.
     */
    static readonly COMMISION = 0.01;

    /**
     * Cached values for lazy-loaded getters.
     */
    #cachedHash?: string;

    /**
     * It’s a unique number that tracks the position
     * of every block in the entire blockchain.
     */
    public blockHeight: number = 0;

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
        public signature?: string,

        /**
         * Timestamp on which the transaction was created.
         */
        public timestamp: number = Date.now()
    ) {}

    /**
     * Flag if transaction is coinbase transaction.
     *
     * A coinbase transaction is a transaction that sends coins to the network.
     * It is created by the node for mining rewards and transaction fees.
     * It doesn't have a sender address and signature.
     */
    get isCoinbase(): boolean {
        return this.from === ROOT_ADDRESS && !this.signature;
    }

    /**
     * Type of the transaction.
     */
    get type(): TransactionType {
        return this.isCoinbase ? 'coinbase' : 'transfer';
    }

    /**
     * Transaction fee to be paid by the sender.
     *
     * There is no fee for coinbase transactions
     * which is created by the network for the miner.
     */
    get fee(): number {
        return this.isCoinbase ? 0 : this.amount * Transaction.COMMISION;
    }

    /**
     * Unique hash string representing the transaction.
     */
    get hash(): string {
        return (this.#cachedHash ??= this.createHash());
    }

    /**
     * Create a computed hash string for the transaction.
     */
    createHash(): string {
        return createHash(this.from + this.to + this.amount + this.timestamp);
    }
}
