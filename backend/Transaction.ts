import { createHash } from './utils';

export class Transaction {
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
        public timestamp: number = Date.now(),

        /**
         * Calculated hash of the transaction.
         */
        public hash: string = ''
    ) {
        // set transaction hash
        this.hash = this.calculateHash();
    }

    /**
     * Calculate the hash of the transaction.
     */
    calculateHash(): string {
        return createHash(this.from + this.to + this.amount + this.timestamp);
    }
}
