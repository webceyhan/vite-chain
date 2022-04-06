import { Router } from 'express';
import { Chain } from '../../core';

export default (chain: Chain) => {
    // define router
    const router = Router();

    // get all transactions
    router.get('/', (req, res) => {
        // check if block query provided
        if (req.query.block) {
            // fetch specific block transactions
            const height = +req.query.block;
            const block = chain.blocks[height];
            res.json(block?.transactions);
        }

        // return all transactions from last block
        res.json(chain.lastBlock.transactions);
    });

    // get transaction by hash
    router.get('/:hash', (req, res) => {
        const hash = req.params.hash;
        res.json(chain.transactionOf(hash));
    });

    return router;
};
