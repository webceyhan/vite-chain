import { magenta, green, blue, yellow, grey } from 'Chalk';
import { Chain } from '../core';

/**
 * Format title to be displayed.
 */
export const formatTitle = (title: any) => magenta(title);

/**
 * Format number to be displayed.
 */
export const formatNumber = (number: any) => yellow(number);

/**
 * Format timestamp to be displayed.
 */
export const formatDate = (date: any) => grey(new Date(date).toLocaleString());

/**
 * Format hash to be displayed.
 */
export const formatHash = (hash: string) => blue(hash);

/**
 * Format address to be displayed.
 */
export const formatAddress = (address: string) => green(address);

/**
 * Format coin to be displayed.
 */
export const formatCoin = (coin: number) =>
    formatNumber(
        new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' })
            .format(coin)
            .replace(/\$/, '')
            .concat(` ${Chain.SYMBOL}`)
    );
