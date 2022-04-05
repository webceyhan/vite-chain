import { formatTitle } from './format';
import { Block, Chain, CoinPool, Transaction, Wallet } from '../core';
import {
    tableFromBlock,
    tableFromChain,
    tableFromCoinPool,
    tableFromTransaction,
    tableFromWallet,
} from './table';

// define shortcut
const _log = console.log;

/**
 * Log a info message to the console.
 */
export const info = (message: string) => _log(formatTitle(message));

/**
 * Log message to the console.
 */
export const log = (message: any): void => {
    // log chain info
    if (message instanceof Chain) {
        return _log(tableFromChain(message));
    }

    // log block info
    if (message instanceof Block) {
        return _log(tableFromBlock(message));
    }

    // log coin pool info
    if (message instanceof CoinPool) {
        return _log(tableFromCoinPool(message));
    }

    // log transaction info
    if (message instanceof Transaction) {
        return _log(tableFromTransaction(message));
    }

    // log wallet info
    if (message instanceof Wallet) {
        return _log(tableFromWallet(message));
    }

    // log others
    return _log(message);
};
