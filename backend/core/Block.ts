import { BLOCK_DIFFICULTY, ROOT_ADDRESS } from '../constants';
import { Transaction } from './Transaction';
import { createHash } from '../utils';

export class Block {
    /**
     * Cached hash of the block.
     */
    private cachedHash?: string;

    constructor(
        /**
         * The height (index) of the block.
         *
         * It’s a unique number that tracks the position
         * of every block in the entire blockchain.
         */
        public height: number,

        /**
         * The hash of the parent block.
         *
         * It points to the hash of the preceding block in the blockchain,
         * something important in maintaining the blockchain’s integrity.
         */
        public parentHash: string,

        /**
         * The list of transactions that are included in the block.
         */
        public transactions: Readonly<Transaction>[],

        /**
         * The POW difficulty level of the block.
         */
        public difficulty: number = 0,

        /**
         * It's nonce for proof-of-work mechanism.
         */
        public nonce: number = 0,

        /**
         * The timestamp on which the block was created.
         */
        public timestamp: number = Date.now()
    ) {}

    /**
     * The unique hash string representing the block.
     */
    get hash(): string {
        return (this.cachedHash ??= this.calculateHash());
    }

    /**
     * Sum of all transaction fees in the block.
     *
     * This will be included in the coinbase transaction of the block.
     *
     * Every transaction may include a transaction fee, in the form of a surplus of bitcoin
     * between the transaction’s inputs and outputs. The winning bitcoin miner gets
     * to “keep the change” on the transactions included in the winning block.
     */
    get transactionFees(): number {
        return this.transactions.reduce((sum, tx) => sum + tx.fee, 0);
    }

    /**
     * Flag if block has valid proof.
     *
     * Proof is valid if the hash of the block starts with the required number of zeros.
     */
    get hasValidProof(): boolean {
        // define proof string based on zeros
        const prefix = '0'.repeat(this.difficulty);

        return this.hash.startsWith(prefix);
    }

    /**
     * Calculate the hash of the block.
     */
    calculateHash(): string {
        return createHash(
            this.height +
                this.parentHash +
                this.difficulty +
                this.nonce +
                this.timestamp +
                this.transactions.map((t) => t.hash).join('')
        );
    }

    /**
     * Try to guess the nonce of the block until it finds
     * a valid hash that satisfies the difficulty level.
     */
    proofOfWork(): void {
        // loop until valid proof is found
        while (!this.hasValidProof) {
            // increment nonce
            this.nonce++;

            // clear cached hash to force recalculation
            // of hash value with new nonce on next call
            this.cachedHash = undefined;
        }
    }
}

/**
 * In a blockchain, the genesis block refers to the first-ever block created on the network.
 * Whenever a block is integrated with the rest of the chain, it should reference the preceding block.
 *
 * Conversely, in the case of this initial block, it does not have any preceding block to point to.
 * Therefore, a genesis block is usually hardcoded into the blockchain. This way,
 * subsequent blocks can be created on it. It usually has an index of 0.
 */
export const GENESIS_BLOCK: Readonly<Block> = new Block(
    0,
    '',
    [new Transaction(ROOT_ADDRESS, 'miner', 100)],
    BLOCK_DIFFICULTY,
    0,
    1545184500
);
