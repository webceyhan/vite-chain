import EventEmitter from 'events';
import { Block, Chain, CoinPool, Transaction } from './core';
import { Wallet } from './wallet';
import { delay } from './utils';
import {
    BlockJSON,
    serializeBlock,
    serializeTransaction,
    TransactionJSON,
    WalletJSON,
} from './serialization';

export type NodeEvent =
    | 'chain:updated'
    | 'block:mined'
    | 'block:added'
    | 'supply:changed'
    | 'transaction:added'
    | 'transaction:discarded';

export class Node {
    /**
     * Version code for the blockchain network.
     *
     * - Mainnet: 0x80
     * - Testnet: 0xef
     */
    static readonly VERSION = 0x80;

    /**
     * Default network port to listen on.
     */
    static readonly PORT = 8080;

    /**
     * Default network hostname or IP address.
     */
    static readonly HOSTNAME = '0.0.0.0';

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
            this.#pendingCoinPool.update(tx);

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
        (block as any).transactions = [...this.#pendingTransactions];

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
            (block as any).nonce++;

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

    // QUERY METHODS ///////////////////////////////////////////////////////////////////////////////

    /**
     * Find a block by query.
     */
    findBlock(q: { index?: number; hash?: string }): BlockJSON | never {
        let found: Block | undefined;

        // find by index
        if (q.index !== undefined) {
            found = this.#chain.blocks[q.index];
        }

        // find by hash
        if (q.hash) {
            found = this.#chain.blocks.find((block) => block.hash === q.hash);
        }

        // throw error if not found
        if (!found) {
            throw new Error('Block not found');
        }

        return serializeBlock(found);
    }

    /**
     * Find all blocks by query.
     */
    findBlocks(q?: {}): BlockJSON[] {
        return this.#chain.blocks.map(serializeBlock);
    }

    /**
     * Find a transaction by query.
     */
    findTransaction(q: { hash: string }): TransactionJSON | never {
        let found: Transaction | undefined;

        // find by hash
        found = this.#chain.transactionMap.get(q.hash);

        // throw error if not found
        if (!found) {
            throw new Error('Transaction not found');
        }

        return serializeTransaction(found);
    }

    /**
     * Find all transactions by query.
     */
    findTransactions(q?: {
        block?: number;
        pending?: boolean;
        address?: string;
    }): TransactionJSON[] {
        // find by block index
        if (q?.block) {
            return this.findBlock({ index: q.block }).transactions;
        }

        // find by pending
        if (q?.pending) {
            return this.#pendingTransactions.map(serializeTransaction);
        }

        // find by address
        if (q?.address) {
            const found: TransactionJSON[] = [];
            this.#chain.transactionMap.forEach((tx) => {
                if (tx.from === q.address) found.push(serializeTransaction(tx));
                if (tx.to === q.address) found.push(serializeTransaction(tx));
            });
            return found;
        }

        // return all transactions from last block
        return this.#chain.lastBlock.transactions.map(serializeTransaction);
    }

    /**
     * Find wallet by query.
     */
    findWallet(q: { address: string }): WalletJSON | never {
        // check if wallet by address exists
        const found = this.#chain.coinPool.has(q.address);

        // throw error if not found
        if (!found) {
            throw new Error('Wallet not found');
        }

        return <WalletJSON>{
            address: q.address,
            balance: this.#chain.coinPool.getBalance(q.address),
            transactions: this.findTransactions({ address: q.address }),
        };
    }

    /**
     * Find all wallets by query.
     */
    findWallets(q?: {}): WalletJSON[] {
        return this.#chain.coinPool.coins.map((coin) => ({
            address: coin.key,
            balance: coin.amount,
            // todo: add transactions
            transactions: [],
        }));
    }
}
