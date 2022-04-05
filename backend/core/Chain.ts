import {
    BLOCK_REWARD,
    BLOCK_REWARD_INTERVAL,
    BLOCK_TIME_INTERVAL,
    ROOT_ADDRESS,
} from '../constants';
import { Block, GENESIS_BLOCK } from './Block';
import { Transaction } from './Transaction';
import { CoinPool } from './Coin';
import { delay } from '../utils';
import EventEmitter from 'events';

export type ChainEvent =
    | 'chain:updated'
    | 'block:mined'
    | 'block:added'
    | 'supply:changed'
    | 'transaction:added'
    | 'transaction:discarded';

export class Chain {
    /**
     * Miner wallet address to collect block rewards.
     */
    public readonly minerAddress: string;

    /**
     * The chain of blocks starting from the genesis block.
     */
    private blocks: Readonly<Block>[] = [GENESIS_BLOCK];

    /**
     * Pool of coins (UTXOs) corresponding to the addresses in the chain.
     */
    private readonly coinPool = new CoinPool();

    /**
     * Pending transactions to be added to the next block.
     */
    private pendingTransactions: Readonly<Transaction>[] = [];

    /**
     * Pending pool of coins (UTXOs) corresponding to the addresses in the chain.
     * This is used to check if a pending transaction is valid (has sufficient funds).
     */
    private pendingCoinPool = new CoinPool();

    /**
     * Internal event emitter.
     */
    private eventEmitter = new EventEmitter();

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
     * Current block difficulty.
     */
    get difficulty(): number {
        return this.lastBlock.difficulty;
    }

    /**
     * Total amount of coins ever minted and generated by fees.
     */
    get totalSupply(): number {
        return this.coinPool.total;
    }

    /**
     * Maximum amout of coins ever can be minted.
     */
    get maxSupply(): number {
        let total = 0;
        let reward = BLOCK_REWARD;

        // halve reward until it reaches 0
        while (reward > 0) {
            // sum reward multiplied by BLOCK_REWARD_INTERVAL
            total += reward * BLOCK_REWARD_INTERVAL;
            reward /= 2; // halve reward
        }

        return total;
    }

    /**
     * Add new transaction to the blockchain.
     */
    addTransaction(tx: Transaction): void {
        // todo: validate transaction
        try {
            // try updating the pending coin pool
            this.pendingCoinPool.transact(tx);

            // add to the pending transactions
            this.pendingTransactions.push(tx);

            // emit transaction:added event
            this.eventEmitter.emit('transaction:added', tx);
        } catch (error) {
            // emit transaction:discarded event
            this.eventEmitter.emit('transaction:discarded', tx, error);
        }
    }

    /**
     * Add new block to the blockchain.
     */
    addBlock(block: Block): void {
        // todo: validate block
        this.blocks.push(block);

        // process transactions in the block
        this.processTransactions(block);

        // reset pending transactions
        this.pendingTransactions = [];

        // reset pending coin pool to the current coin pool
        this.pendingCoinPool = this.coinPool.clone();

        // emit block:added event
        this.eventEmitter.emit('block:added', block);
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

        // emit block:mined event
        this.eventEmitter.emit('block:mined', block);

        // add block to chain
        this.addBlock(block);
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

    /**
     * Process transactions in the block.
     *
     * This method is called after a block is added to the chain.
     * It is responsible for updating the coin pool (UTXOs)
     */
    private processTransactions(block: Block): void {
        // update coin pool with the block transactions
        block.transactions.map((tx) => this.coinPool.transact(tx));

        // emit supply:changed event
        this.eventEmitter.emit('supply:changed', this.coinPool);
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

    // EVENT EMITTER METHODS ///////////////////////////////////////////////////////////////////////

    /**
     * Emit chain event.
     */
    emit(eventName: ChainEvent, ...args: any[]): void {
        // emit provided event with arguments
        this.eventEmitter.emit(eventName, ...args);

        // emit chain:updated event
        this.eventEmitter.emit('chain:updated', this);
    }

    /**
     * Add chain event listener.
     */
    on(eventName: ChainEvent, listener: (...args: any[]) => void): void {
        this.eventEmitter.on(eventName, listener);
    }
}
