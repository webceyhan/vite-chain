import { createHash } from './utils';

export class Transaction {
    constructor(
        public from: string,
        public to: string,
        public amount: number,
        public timestamp: number = Date.now(),
        public hash: string = ''
    ) {
        this.hash = this.calculateHash();
    }

    calculateHash(): string {
        return createHash(this.from + this.to + this.amount + this.timestamp);
    }
}
