import { Transaction } from './Transaction';

export class Block {
    constructor(
        public index: number,
        public parentHash: string,
        public transactions: Transaction[],
        public timestamp: number = Date.now(),
        public hash: string = ''
    ) {}
}
