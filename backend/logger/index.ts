import { Chain } from '../core';
import { formatCoin } from './format';
import { log, info } from './log';

export const createLogger = (chain: Chain) => {
    // log chain info
    info('Blockchain initialized');
    log(chain);

    // log genesis block
    info('Genesis block initialized');
    log(chain.genesisBlock);

    // log mined block
    chain.on('block:mined', (block) => {
        info('New block mined.');
        log(block);
    });

    // log new pending transaction
    chain.on('transaction:added', (tx) => {
        info('New pending transaction added.');
        log(tx);
    });

    // log discarded transaction
    chain.on('transaction:discarded', (tx) => {
        info('Pending transaction discarded.');
        log(tx);
    });

    // log supply changes
    chain.on('supply:changed', (pool) => {
        info(`Total Supply changed: ${formatCoin(pool.total)}`);
        log(pool);
    });

    return { log, info };
};
