import { Transaction } from '../core';

type Keys =
    | 'hash'
    | 'from'
    | 'to'
    | 'amount'
    | 'fee'
    | 'signature'
    | 'blockHeight'
    | 'type'
    | 'timestamp';

export type TransactionJSON = Pick<Transaction, Keys>;

/**
 * Serialize transaction to JSON.
 */
export const serializeTransaction = (tx: Transaction): TransactionJSON => ({
    hash: tx.hash,
    from: tx.from,
    to: tx.to,
    amount: tx.amount,
    fee: tx.fee,
    signature: tx.signature,
    blockHeight: tx.blockHeight,
    type: tx.type,
    timestamp: tx.timestamp,
});

/**
 * Deserialize transaction from JSON.
 */
export const deserializeTransaction = (json: TransactionJSON): Transaction =>
    new Transaction(
        json.from,
        json.to,
        json.amount,
        json.signature,
        json.timestamp
    );
