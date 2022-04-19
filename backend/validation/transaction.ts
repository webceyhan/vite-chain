import { Transaction } from '../core';
import { Wallet } from '../wallet';

export class TransactionError extends Error {}

/**
 * Check if transaction has valid signature.
 */
const hasValidSignature = (tx: Transaction): boolean => {
    // bypass signature for coinbase transactions
    if (tx.isCoinbase) return true;

    // verify signature with public key of sender
    return Wallet.verify(tx.hash, tx.signature, tx.from);
};

/**
 * Validate transaction.
 */
export const validateTransaction = (tx: Transaction): void | never => {
    // skip if transaction is coinbase transaction
    if (tx.type === 'coinbase') return;

    // fail if transaction has invalid from address
    if (!tx.from.length || tx.from.length != 66) {
        throw new TransactionError(`Invalid sender address: ${tx.from}`);
    }

    // fail if transaction has invalid to address
    if (!tx.to.length || tx.to.length != 66) {
        throw new TransactionError(`Invalid recipient address: ${tx.to}`);
    }

    // fail if transaction has invalid amount
    if (tx.amount <= 0) {
        throw new TransactionError(`Invalid amount: ${tx.amount}`);
    }

    // fail if transaction has invalid timestamp
    if (tx.timestamp <= 0) {
        throw new TransactionError(`Invalid timestamp: ${tx.timestamp}`);
    }

    // fail if transaction has invalid signature
    if (!hasValidSignature(tx)) {
        throw new TransactionError(`Invalid signature: ${tx.signature}`);
    }
};
