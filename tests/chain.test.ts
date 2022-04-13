import { Block, Chain } from '../backend/core';
import { Wallet } from '../backend/wallet';

const miner = Wallet.import();
const chain = new Chain(miner.address);

describe('Chain with defaults', () => {
    test('has size of 1', () => {
        expect(chain.size).toBe(1);
        expect(chain.blocks.length).toBe(1);
    });

    test('has valid genesis block', () => {
        expect(chain.genesisBlock).toBe(Block.GENESIS);
    });

    test('first block is genesis block', () => {
        expect(chain.blocks[0]).toEqual(Block.GENESIS);
    });

    test('last block is genesis block', () => {
        expect(chain.lastBlock).toEqual(Block.GENESIS);
    });

    test('has next block with valid param', () => {
        const nextBlock = chain.nextBlock;

        expect(nextBlock.index).toBe(1);
        expect(nextBlock.parentHash).toBe(chain.lastBlock.hash);
        expect(nextBlock.transactions).toEqual([]);
        expect(nextBlock.difficulty).toBe(0);
        expect(nextBlock.nonce).toBe(0);
        expect(nextBlock.timestamp).toBeGreaterThan(Date.now() - 1000);
        expect(nextBlock.timestamp).toBeLessThan(Date.now() + 1000);
        expect(nextBlock.hash).toMatch(/^0x[0-9a-f]{64}$/);
        expect(nextBlock.hash).toBe(nextBlock.createHash());
    });

    test('should be equal to another with same params', () => {
        expect(chain).toEqual(new Chain(miner.address));
    });
});
