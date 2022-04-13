import { Transaction } from '../backend/core';

describe('Coinbase Transaction', () => {
    // create coinbase transaction
    const tx = new Transaction('0', 'minerAddress', 10);

    it('has valid sender and receiver', () => {
        expect(tx.from).toBe('0');        
        expect(tx.to).toBe('minerAddress');
    });

    it('has valid amount and 0 fee', () => {
        expect(tx.amount).toBe(10);
        expect(tx.fee).toBe(0);
    });

    it('has "coinbase" type and isCoinbase = true', () => {
        expect(tx.isCoinbase).toBe(true);
        expect(tx.type).toBe('coinbase');
    });

    it('has no signature', () => {
        expect(tx.signature).toBeUndefined();
    });

    it('has timestamp +/-1 second around now', () => {
        expect(tx.timestamp).toBeGreaterThan(Date.now() - 1000);
        expect(tx.timestamp).toBeLessThan(Date.now() + 1000);
    });

    it('has valid hash', () => {
        expect(tx.hash).toBe(tx.createHash());
        expect(tx.hash).toMatch(/^0x[0-9a-f]{64}$/);
    });
});
