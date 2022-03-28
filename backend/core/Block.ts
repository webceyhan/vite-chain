import { Transaction } from './Transaction';
import { createHash } from '../utils';

export class Block {
    /**
     * Cached hash of the block.
     */
    private cachedHash?: string;

    constructor(
        /**
         * The index of the block.
         *
         * It’s a unique number that tracks the position
         * of every block in the entire blockchain.
         */
        public index: number,

        /**
         * The hash of the parent block.
         *
         * It points to the hash of the preceding block in the blockchain,
         * something important in maintaining the blockchain’s integrity.
         */
        public parentHash: string,

        /**
         * The list of transactions that are included in the block.
         */
        public transactions: Transaction[],

        /**
         * The timestamp on which the block was created.
         */
        public timestamp: number = Date.now()
    ) {}

    /**
     * The unique hash string representing the block.
     */
    get hash(): string {
        return (this.cachedHash ??= this.calculateHash());
    }

    /**
     * Calculate the hash of the block.
     */
    calculateHash(): string {
        return createHash(
            this.index +
                this.parentHash +
                this.timestamp +
                this.transactions.map((t) => t.hash).join('')
        );
    }
}
