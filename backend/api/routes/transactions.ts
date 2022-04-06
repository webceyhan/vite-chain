import { Router } from 'express';
import { Chain } from '../../core';

export default (chain: Chain) => {
    // define router
    const router = Router();

    // get all transactions
    router.get('/', (req, res) => {
        // get by block height
        if (req.query.block) {
            const height = +req.query.block;
            const block = chain.findBlockByHeight(height);

            return res.json(block.transactions);
        }

        // get by address
        if (req.query.address) {
            const address = req.query.address as string;
            const transactions = chain.findTransactionsByAddress(address);

            return res.json(transactions);
        }

        // return all transactions from last block
        res.json(chain.lastBlock.transactions);
    });

    // get transaction by hash
    router.get('/:hash', (req, res) => {
        const hash = req.params.hash;

        res.json(chain.findTransaction(hash));
    });

    return router;
};
