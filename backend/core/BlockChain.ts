import { Block, GENESIS_BLOCK } from './Block';
import { Transaction } from './Transaction';

export class BlockChain {
    /**
     * The chain of blocks starting from the genesis block.
     */
    public chain: Block[] = [GENESIS_BLOCK];

    /**
     * Pending transactions to be added to the next block.
     */
    private pendingTransactions: Transaction[] = [];

    /**
     * Add new transaction to the blockchain.
     */
    addTransaction(tx: Transaction): void {
        // todo: validate transaction
        this.pendingTransactions.push(tx);
    }
}
