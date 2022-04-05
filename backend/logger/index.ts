import { Chain } from '../core';
import { log, info } from './log';

export const createLogger = (chain: Chain) => {
    // log chain info
    info('Blockchain initialized');
    log(chain);

    // log genesis block
    info('Genesis block initialized');
    log(chain.genesisBlock);

    return { log, info };
};
