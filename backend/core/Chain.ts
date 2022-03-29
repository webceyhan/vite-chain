import { BLOCK_TIME_INTERVAL } from '../constants';
import { Block, GENESIS_BLOCK } from './Block';
import { Transaction } from './Transaction';
import { delay } from '../utils';

export class Chain {
    /**
     * The chain of blocks starting from the genesis block.
     */
    private blocks: Readonly<Block>[] = [GENESIS_BLOCK];

    /**
     * Pending transactions to be added to the next block.
     */
    private pendingTransactions: Readonly<Transaction>[] = [];

    /**
     * Size of the chain.
     */
    get size(): number {
        return this.blocks.length;
    }

    /**
     * Genesis block (first block in the chain).
     */
    get genesisBlock(): Block {
        return this.blocks[0];
    }

    /**
     * Last block in the chain.
     *
     * Getting the latest block in the blockchain assists in ensuring the hash of the current block
     * points to the hash of the previous block — thus maintaining the chain’s integrity.
     */
    get lastBlock(): Block {
        return this.blocks[this.size - 1];
    }

    /**
     * Next block to be mined.
     */
    get nextBlock(): Block {
        return new Block(
            this.size,
            this.lastBlock.hash,
            this.pendingTransactions,
            this.lastBlock.difficulty
        );
    }

    /**
     * Add new transaction to the blockchain.
     */
    addTransaction(tx: Transaction): void {
        // todo: validate transaction
        this.pendingTransactions.push(tx);
    }

    /**
     * Add new block to the blockchain.
     */
    addBlock(block: Block): void {
        // todo: validate block
        this.blocks.push(block);

        // reset pending transactions
        this.pendingTransactions = [];
    }

    // MINING //////////////////////////////////////////////////////////////////////////////////////

    /**
     * Start mining loop.
     */
    async startMiningLoop() {
        // await for interval to pass
        await delay(BLOCK_TIME_INTERVAL);

        // mine next block
        this.mineBlock();

        // repeat mining loop
        this.startMiningLoop();
    }

    /**
     * Create a new block and add it to the chain.
     */
    private mineBlock() {
        // get next block to mine
        const block = this.nextBlock;

        // compute proof-of-work mechanism
        block.proofOfWork();

        // add block to chain
        this.addBlock(block);

        // log block
        console.log(`Mined block #${block.height}`);
    }
}
