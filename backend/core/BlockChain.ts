import { Block, GENESIS_BLOCK } from './Block';
import { Transaction } from './Transaction';

export class BlockChain {
    /**
     * The chain of blocks starting from the genesis block.
     */
    private chain: Block[] = [GENESIS_BLOCK];

    /**
     * Pending transactions to be added to the next block.
     */
    private pendingTransactions: Transaction[] = [];

    /**
     * Size of the chain.
     */
    get size(): number {
        return this.chain.length;
    }

    /**
     * Genesis block (first block in the chain).
     */
    get genesisBlock(): Block {
        return this.chain[0];
    }

    /**
     * Last block in the chain.
     *
     * Getting the latest block in the blockchain assists in ensuring the hash of the current block
     * points to the hash of the previous block — thus maintaining the chain’s integrity.
     */
    get lastBlock(): Block {
        return this.chain[this.size - 1];
    }

    /**
     * Next block to be mined.
     */
    get nextBlock(): Block {
        return new Block(
            this.size,
            this.lastBlock.hash,
            this.pendingTransactions
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
        this.chain.push(block);
    }
}
