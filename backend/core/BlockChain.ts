import { Block, GENESIS_BLOCK } from './Block';

export class BlockChain {
    constructor(
        /**
         * The chain of blocks starting from the genesis block.
         */
        public chain: Block[] = [GENESIS_BLOCK]
    ) {}
}
