import { Transaction } from './Transaction';
import { createHash } from './utils';

export class Block {
    constructor(
        public index: number,
        public parentHash: string,
        public transactions: Transaction[],
        public timestamp: number = Date.now(),
        public hash: string = ''
    ) {
        this.hash = this.calculateHash();
    }

    calculateHash(): string {
        return createHash(
            this.index +
                this.parentHash +
                this.timestamp +
                this.transactions.map((t) => t.hash).join('')
        );
    }
}
