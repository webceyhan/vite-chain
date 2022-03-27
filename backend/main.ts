export class Transaction {
    constructor(
        public from: string,
        public to: string,
        public amount: number,
        public timestamp: number = Date.now(),
        public hash: string = ''
    ) {}
}

export class Block {
    constructor(
        public index: number,
        public parentHash: string,
        public transactions: Transaction[],
        public timestamp: number = Date.now(),
        public hash: string = ''
    ) {}
}

export class BlockChain {
    constructor(public chain: Block[]) {}
}

const genesisBlock = new Block(0, '', [], 1545184500, '0');
const blockChain = new BlockChain([genesisBlock]);

console.log(blockChain);
