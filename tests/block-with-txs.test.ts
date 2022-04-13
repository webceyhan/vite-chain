import { Block, Transaction } from '../backend/core';

describe('Block with transactions', () => {
    // create transfer transactions
    const tx1 = new Transaction('A', 'B', 10);
    const tx2 = new Transaction('B', 'C', 20);

    // create coinbase transaction
    const coinbaseTx = new Transaction('0', 'A', tx1.fee + tx2.fee);

    // create block with transaction data
    const block = new Block(1, '', [coinbaseTx, tx1, tx2]);

    it('has valid tx length', () => {
        expect(block.transactions.length).toEqual(3);
    });

    it('has first element as coinbase transaction', () => {
        expect(block.transactions[0].isCoinbase).toBe(true);
    });

    it('has valid totalAmount', () => {
        expect(block.totalAmount).toEqual(
            coinbaseTx.amount + tx1.amount + tx2.amount
        );
    });

    it('has valid totalFees (exclusive coinbase tx)', () => {
        expect(block.totalFees).toEqual(coinbaseTx.fee + tx1.fee + tx2.fee);
    });

    it('has valid mining reward', () => {
        expect(block.miningReward).toEqual(Block.INITIAL_REWARD);
    });

    it('has valid total reward sum', () => {
        expect(block.reward).toEqual(Block.INITIAL_REWARD + block.totalFees);
    });

    it('has valid miner address pointing to coinbase tx', () => {
        expect(block.miner).toEqual(coinbaseTx.to);
    });
});
