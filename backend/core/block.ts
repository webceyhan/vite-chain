import {
    BLOCK_DIFFICULTY,
    BLOCK_REWARD,
    BLOCK_REWARD_INTERVAL,
} from '../constants';
import { Transaction } from './transaction';
import { createHash } from '../utils';

export class Block {
    /**
     * The unique hash string representing the block.
     */
    public hash: string;

    constructor(
        /**
         * The index (height) of the block.
         *
         * It’s a unique number that tracks the position
         * of every block in the entire blockchain.
         */
        public index: number,

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
    ) {
        // set calculated hash
        this.hash = this.calculateHash();
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
    get totalFees(): number {
        return this.transactions.reduce((sum, tx) => sum + tx.fee, 0);
    }

    /**
     * Sum of all transaction amounts in the block.
     */
    get totalAmount(): number {
        return this.transactions.reduce((sum, tx) => sum + tx.amount, 0);
    }

    /**
     * Mining reward for the block.
     *
     * Mining is the invention that makes bitcoin special, a decentralized security mechanism
     * that is the basis for peer-to-peer digital cash. The reward of newly minted coins
     * and transaction fees is an incentive scheme that aligns the actions of miners
     * with the security of the network, while simultaneously implementing the monetary supply.
     */
    get miningReward(): number {
        // calculate block reward halving rate
        const halvingRate = Math.floor(this.index / BLOCK_REWARD_INTERVAL);

        // calculate current block reward based on
        // initial_reward divided by 2 ** halving_rate
        const reward = BLOCK_REWARD / Math.pow(2, halvingRate);

        // return reward if available
        return reward > 0 ? reward : 0;
    }

    /**
     * Total block reward for the block.
     *
     * Miners receive two types of rewards for mining:
     *  1) new coins created with each new block
     *  2) transaction fees from all the transactions included in the block.
     */
    get reward(): number {
        return this.totalFees + this.miningReward;
    }

    /**
     * Miner address who created the block.
     *
     * The miner’s address is used to collect the block rewards.
     * It is also used as recipient address for the coinbase transaction.
     */
    get miner(): string {
        return this.transactions[0]?.to || '0';
    }

    /**
     * Calculate the hash of the block.
     */
    calculateHash(): string {
        return createHash(
            this.index +
                this.parentHash +
                this.difficulty +
                this.nonce +
                this.timestamp +
                this.transactions.map((t) => t.hash).join('')
        );
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
    /* index        */ 0,
    /* parentHash   */ '0',
    /* transactions */ [],
    /* difficulty   */ BLOCK_DIFFICULTY,
    /* nonce        */ 0,
    /* timestamp    */ new Date('2022-01-01').getTime()
);
