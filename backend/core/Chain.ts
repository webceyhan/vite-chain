import { BLOCK_TIME_INTERVAL, ROOT_ADDRESS } from '../constants';
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
     * Miner wallet address to collect block rewards.
     */
    private readonly minerAddress: string;

    constructor(minerAddress: string) {
        // set miner wallet address
        this.minerAddress = minerAddress;
    }

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

        // add coinbase transaction
        this.addCoinbaseTransaction(block);

        // compute proof-of-work mechanism
        this.computeProofOfWork(block);

        // add block to chain
        this.addBlock(block);

        // log block
        console.log(`Mined block #${block.height}`);
    }

    /**
     * Add coinbase transaction to the block.
     */
    private addCoinbaseTransaction(block: Block): void {
        // create coinbase transaction
        const coinbaseTx = new Transaction(
            ROOT_ADDRESS,
            this.minerAddress,
            block.reward
        );

        // add to the beginning of the block
        block.transactions.unshift(coinbaseTx);
    }

    // CONSENSUS ///////////////////////////////////////////////////////////////////////////////////

    /**
     * Try to guess the nonce of the block until it finds
     * a valid hash that satisfies the difficulty level.
     */
    computeProofOfWork(block: Block): void {
        // define proof string based on zeros
        // e.g. if difficulty is 3, then proof string will be '000'
        const prefix = '0'.repeat(block.difficulty);

        // loop until valid proof is found
        while (!block.hash.startsWith(prefix)) {
            // increment nonce
            block.nonce++;

            // recalculate hash
            block.hash = block.calculateHash();
        }
    }
}
