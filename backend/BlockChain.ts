import { Block } from './Block';

export class BlockChain {
    constructor(
        /**
         * The chain of blocks starting from the genesis block.
         */
        public chain: Block[]
    ) {}
}
