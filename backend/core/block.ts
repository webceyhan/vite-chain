import { Transaction } from './transaction';
import { createHash } from '../utils';

export class Block {
    /**
     * Initial mining reward per block.
     *
     * Original block reward for miners was 50 BTC.
     *
     * Every N blocks defined by BLOCK_REWARD_INTERVAL,
     * the reward is divided by 2 which called halving.
     */
    static readonly INITIAL_REWARD = 50;

    /**
     * Number of blocks for halving the reward.
     *
     * In Bitcoin, original block reward interval was 210000
     * around every 4 years with a 10 minute block interval
     */
    static readonly REWARD_HALVING_INTERVAL = 100;

    /**
     * In a blockchain, the genesis block refers to the first-ever block created on the network.
     * Whenever a block is integrated with the rest of the chain, it should reference the preceding block.
     *
     * Conversely, in the case of this initial block, it does not have any preceding block to point to.
     * Therefore, a genesis block is usually hardcoded into the blockchain. This way,
     * subsequent blocks can be created on it. It usually has an index of 0.
     */
    static readonly GENESIS: Readonly<Block> = new Block(
        /* index        */ 0,
        /* parent hash  */ '0x0000000000000000000000000000000000000000000000000000000000000000',
        /* transactions */ [],
        /* difficulty   */ 0,
        /* nonce        */ 0,
        /* timestamp    */ new Date('2022-02-22T00:00:00.000Z').getTime()
    );

    /**
     * Cached values for lazy-loaded getters.
     */
    #cachedHash?: string;

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
        public transactions: Readonly<Transaction>[] = [],

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
        const halvingRate = Math.floor(
            this.index / Block.REWARD_HALVING_INTERVAL
        );

        // calculate current block reward based on
        // initial_reward divided by 2 ** halving_rate
        const reward = Block.INITIAL_REWARD / Math.pow(2, halvingRate);

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
     * Unique hash string representing the block.
     */
    get hash(): string {
        return (this.#cachedHash ??= this.createHash());
    }

    /**
     * Create a computed hash string for the block.
     */
    createHash(): string {
        return createHash(
            this.index +
                this.parentHash +
                this.difficulty +
                this.nonce +
                this.transactions.map((t) => t.hash).join('') +
                this.timestamp
        );
    }

    /**
     * Reset cached hash value.
     */
    resetHash(): void {
        this.#cachedHash = undefined;
    }
}
