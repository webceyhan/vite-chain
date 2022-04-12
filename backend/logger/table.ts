import { table as _table, getBorderCharacters } from 'table';
import { Block, Chain, CoinPool, Transaction } from '../core';
import { Wallet } from '../wallet';
import {
    formatAddress,
    formatCoin,
    formatDate,
    formatHash,
    formatNumber,
} from './format';

/**
 * Convert an array of objects to a table.
 */
const table = (data: any[][], opts = {}): string =>
    _table(data, {
        border: getBorderCharacters('norc'),
        ...opts,
    });

/**
 * Convert a chain object to table.
 */
export const tableFromChain = (ch: Chain) =>
    table([
        ['Size', formatNumber(ch.size)],
        ['Difficulty', formatNumber(ch.difficulty)],
        ['Max Supply', formatCoin(ch.maxSupply)],
        ['Total Supply', formatCoin(ch.totalSupply)],
        ['Miner Address', formatAddress(ch.minerAddress)],
    ]);

/**
 * Convert a block object to table.
 */
export const tableFromBlock = (bc: Block) =>
    table([
        ['Height', formatNumber(bc.height)],
        ['Hash', formatHash(bc.hash)],
        ['Parent Hash', formatHash(bc.parentHash)],
        ['Difficulty', formatNumber(bc.difficulty)],
        ['Nonce', formatNumber(bc.nonce)],
        ['Total Txs', formatNumber(bc.transactions.length)],
        ['Total amount', formatCoin(bc.totalAmount)],
        ['Total fees', formatCoin(bc.totalFees)],
        ['Reward', formatCoin(bc.reward)],
        ['Miner', formatAddress(bc.miner)],
        ['Timestamp', formatDate(bc.timestamp)],
    ]);

/**
 * Convert a transaction object to table.
 */
export const tableFromTransaction = (tx: Transaction) =>
    table([
        ['Hash', formatHash(tx.hash)],
        ['From', formatAddress(tx.from)],
        ['To', formatAddress(tx.to)],
        ['Amount', formatCoin(tx.amount)],
        ['Timestamp', formatDate(tx.timestamp)],
    ]);

/**
 * Convert a coin pool object to table.
 */
export const tableFromCoinPool = (pool: CoinPool) =>
    table(
        pool.coins.map((coin) => [
            formatAddress(coin.key),
            formatCoin(coin.amount),
        ])
    );

/**
 * Convert a wallet object to table.
 */
export const tableFromWallet = (wallet: Wallet) =>
    table([
        ['Address', formatAddress(wallet.address)],
        ['Public Key', formatAddress(wallet.publicKey)],
    ]);
