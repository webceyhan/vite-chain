import EventEmitter from 'events';
import { Block, Chain, CoinPool, Transaction } from './core';
import { Wallet } from './wallet';
import { delay } from './utils';

export type NodeEvent =
    | 'chain:updated'
    | 'block:mined'
    | 'block:added'
    | 'supply:changed'
    | 'transaction:added'
    | 'transaction:discarded';

export class Node {
    /**
     * Miner wallet to collect block rewards.
     */
    readonly #miner: Wallet;

    /**
     * The blockchain that the node is running on.
     */
    readonly #chain: Chain;

    /**
     * Internal event emitter.
     */
    readonly #emitter = new EventEmitter();

    /**
     * Pending pool of coins (UTXOs) corresponding to the addresses in the chain.
     * This is used to check if a pending transaction is valid (has sufficient funds).
     */
    #pendingCoinPool = new CoinPool();

    /**
     * Pending transactions to be added to the next block.
     */
    #pendingTransactions: Transaction[] = [];

    constructor(miner: Wallet, chain: Chain) {
        // set miner wallet
        this.#miner = miner;

        // set blockchain
        this.#chain = chain;
    }

    /**
     * Add new transaction to the blockchain.
     */
    addTransaction(tx: Transaction): void {
        // todo: validate transaction
        try {
            // try updating the pending coin pool
            this.#pendingCoinPool.transact(tx);

            // add to the pending transactions
            this.#pendingTransactions.push(tx);

            // emit transaction:added event
            this.emit('transaction:added', tx);
        } catch (error) {
            // emit transaction:discarded event
            this.emit('transaction:discarded', tx, error);
        }
    }

    /**
     * Add new block to the blockchain.
     */
    addBlock(block: Block): void {
        // todo: validate block
        this.#chain.addBlock(block);

        // emit block:added event
        this.emit('block:added', block);

        // reset pending transactions
        this.#pendingTransactions = [];

        // sync pending coin pool with the chain
        this.#pendingCoinPool = this.#chain.coinPool.clone();

        // emit supply:changed event
        this.emit('supply:changed', this.#pendingCoinPool);
    }

    // MINING //////////////////////////////////////////////////////////////////////////////////////

    /**
     * Start mining loop.
     */
    async startMiningLoop() {
        // await for interval to pass
        await delay(Block.MINING_TIME_INTERVAL);

        // mine next block
        this.#mineBlock();

        // repeat mining loop
        this.startMiningLoop();
    }

    /**
     * Create a new block and add it to the chain.
     */
    #mineBlock() {
        // get next block to mine
        const block = this.#chain.nextBlock;

        // add pending transactions to the block
        block.transactions = [...this.#pendingTransactions];

        // add coinbase transaction
        this.#addCoinbaseTransaction(block);

        // compute proof-of-work mechanism
        this.#computeProofOfWork(block);

        // emit block:mined event
        this.emit('block:mined', block);

        // add block to chain
        this.addBlock(block);
    }

    /**
     * Add coinbase transaction to the block.
     */
    #addCoinbaseTransaction(block: Block): void {
        // create coinbase transaction
        const coinbaseTx = new Transaction(
            '0', // root address
            this.#miner.address,
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
    #computeProofOfWork(block: Block): void {
        // define proof string based on zeros
        // e.g. if difficulty is 3, then proof string will be '000'
        const prefix = '0x' + '0'.repeat(block.difficulty);

        // loop until valid proof is found
        while (!block.hash.startsWith(prefix)) {
            // increment nonce
            block.nonce++;

            // reset hash to recalculate
            block.resetHash();
        }
    }

    // EVENT EMITTER METHODS ///////////////////////////////////////////////////////////////////////

    /**
     * Emit chain event.
     */
    emit(eventName: NodeEvent, ...args: any[]): void {
        // emit provided event with arguments
        this.#emitter.emit(eventName, ...args);

        // emit chain:updated event
        this.#emitter.emit('chain:updated', this.#chain);
    }

    /**
     * Add chain event listener.
     */
    on(eventName: NodeEvent, listener: (...args: any[]) => void): void {
        this.#emitter.on(eventName, listener);
    }

    /**
     * Remove chain event listener.
     */
    off(eventName: NodeEvent, listener: (...args: any[]) => void): void {
        this.#emitter.off(eventName, listener);
    }
}
