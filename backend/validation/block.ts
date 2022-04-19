import { Block } from '../core';
import { validateTransaction } from './transaction';

export class BlockError extends Error {}

/**
 * Check if block has valid proof of work.
 * Proof is valid if the hash of the block starts with the required number of zeros.
 */
const hasValidProof = (block: Block): boolean => {
    // define proof string based on zeros
    const prefix = '0'.repeat(block.difficulty);
    return block.hash.startsWith(prefix);
};

/**
 * Validate block.
 */
export const validateBlock = (block: Block): void | never => {
    // fail if height is not valid
    if (block.index < 0) {
        throw new BlockError(`Invalid block height: ${block.index}`);
    }

    // fail if parent hash is not valid
    if (block.parentHash?.length != 66) {
        throw new BlockError(`Invalid parent hash: ${block.parentHash}`);
    }

    // fail if difficulty is not valid
    if (block.difficulty < 0) {
        throw new BlockError(`Invalid difficulty: ${block.difficulty}`);
    }

    // fail if nonce is not valid
    if (block.nonce < 0) {
        throw new BlockError(`Invalid nonce: ${block.nonce}`);
    }

    // fail if hash is not valid
    if (block.hash?.length != 66) {
        throw new BlockError(`Invalid hash: ${block.hash}`);
    }

    // fail if proof is not valid
    if (!hasValidProof(block)) {
        throw new BlockError(`Invalid proof`);
    }

    // validate all block transactions
    block.transactions.map(validateTransaction);
};
