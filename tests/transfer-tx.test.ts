import { Transaction } from '../backend/core';

describe('Transfer Transaction', () => {
    // define sample data
    const senderAddress = '0f572e5295c57f15886f9b263e2f6d2d6c7b5ec6';
    const receiverAddress = '0f572e5295c57f15886f9b263e2f6d2d6c7b5ec7';
    const signature = '0x0f572e5295c57f15886f9b263e2f6d2d6c7b5ec6';

    // create transfer transaction
    const tx = new Transaction(senderAddress, receiverAddress, 10, signature);

    it('has valid sender and receiver', () => {
        expect(tx.from).toBe(senderAddress);
        expect(tx.to).toBe(receiverAddress);
    });

    it('has valid amount and fee', () => {
        expect(tx.amount).toBe(10);
        expect(tx.fee).toBe(tx.amount * Transaction.COMMISION);
    });

    it('has "transfer" type and isCoinbase = false', () => {
        expect(tx.isCoinbase).toBe(false);
        expect(tx.type).toBe('transfer');
    });

    it('has valid timestamp ~1 second around now', () => {
        expect(tx.timestamp).toBeGreaterThan(Date.now() - 1000);
        expect(tx.timestamp).toBeLessThan(Date.now() + 1000);
    });

    it('has valid hash', () => {
        expect(tx.hash).toBe(tx.createHash());
        expect(tx.hash).toMatch(/^0x[0-9a-f]{64}$/);
    });

    it('has valid signature', () => {
        expect(tx.signature).toBe(signature);
    });

    it('should be equal to another with same params', () => {
        expect(tx).toEqual(
            new Transaction(
                tx.from,
                tx.to,
                tx.amount,
                tx.signature,
                tx.timestamp
            )
        );
    });
});
