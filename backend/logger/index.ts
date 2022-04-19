import { Node } from '../node';
import { formatCoin } from './format';
import { log, info } from './log';

export const useLogger = (node: Node) => {
    // log mined block
    node.on('block:mined', (block) => {
        info('New block mined.');
        log(block);
    });

    // log discarded block
    node.on('block:discarded', (block) => {
        info('Block discarded.');
    });

    // log new pending transaction
    node.on('transaction:added', (tx) => {
        info('New pending transaction added.');
        log(tx);
    });

    // log discarded transaction
    node.on('transaction:discarded', (tx) => {
        info('Pending transaction discarded.');
    });

    // log supply changes
    node.on('supply:changed', (pool) => {
        info(`Total Supply changed: ${formatCoin(pool.total)}`);
        log(pool);
    });
};
