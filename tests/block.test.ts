import { Block } from '../backend/core';

describe('Block with defaults', () => {
    const block = new Block(1, '');

    it('has valid index', () => {
        expect(block.index).toBe(1);
    });

    it('has valid parentHash', () => {
        expect(block.parentHash).toBe('');
    });

    it('has zero transactions', () => {
        expect(block.transactions).toEqual([]);
    });

    it('has valid POW params', () => {
        expect(block.difficulty).toEqual(0);
        expect(block.nonce).toEqual(0);
    });

    it('has valid timestamp ~1 second around now', () => {
        expect(block.timestamp).toBeGreaterThan(Date.now() - 1000);
        expect(block.timestamp).toBeLessThan(Date.now() + 1000);
    });

    it('has valid calculated hash', () => {
        expect(block.hash).toMatch(/^0x[0-9a-f]{64}$/);
        expect(block.hash).toBe(block.createHash());
    });

    it('should be equal to another with same params', () => {
        expect(block).toEqual(
            new Block(
                block.index,
                block.parentHash,
                block.transactions,
                block.difficulty,
                block.nonce,
                block.timestamp
            )
        );
    });
});
