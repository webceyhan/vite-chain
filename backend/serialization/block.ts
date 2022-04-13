import { Block } from '../core';
import {
    deserializeTransaction,
    serializeTransaction,
    TransactionJSON,
} from './transaction';

type Keys =
    | 'index'
    | 'parentHash'
    | 'difficulty'
    | 'nonce'
    // | 'transactions'
    | 'hash'
    | 'miner'
    | 'reward'
    | 'timestamp';

export type BlockJSON = Pick<Block, Keys> & { transactions: TransactionJSON[] };

/**
 * Serialize block to JSON.
 */
export const serializeBlock = (block: Block): BlockJSON => ({
    index: block.index,
    parentHash: block.parentHash,
    difficulty: block.difficulty,
    nonce: block.nonce,
    transactions: block.transactions.map(serializeTransaction),
    hash: block.hash,
    miner: block.miner,
    reward: block.reward,
    timestamp: block.timestamp,
});

/**
 * Deserialize block from JSON.
 */
export const deserializeBlock = (json: BlockJSON): Block =>
    new Block(
        json.index,
        json.parentHash,
        json.transactions.map(deserializeTransaction),
        json.difficulty,
        json.nonce,
        json.timestamp
    );
