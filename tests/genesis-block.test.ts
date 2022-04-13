import { Block } from '../backend/core';

describe('Genesis Block', () => {
    it('has valid index', () => {
        expect(Block.GENESIS.index).toBe(0);
    });

    it('has valid parentHash', () => {
        expect(Block.GENESIS.parentHash).toBe(
            '0x0000000000000000000000000000000000000000000000000000000000000000'
        );
    });

    it('has zero transactions', () => {
        expect(Block.GENESIS.transactions).toEqual([]);
    });

    it('has valid POW params', () => {
        expect(Block.GENESIS.difficulty).toEqual(0);
        expect(Block.GENESIS.nonce).toEqual(0);
    });

    it('has valid timestamp', () => {
        expect(Block.GENESIS.timestamp).toEqual(
            new Date('2022-02-22T00:00:00.000Z').getTime()
        );
    });

    it('has valid calculated hash', () => {
        expect(Block.GENESIS.hash).toMatch(/^0x[0-9a-f]{64}$/);
        expect(Block.GENESIS.hash).toBe(Block.GENESIS.createHash());
    });
});
