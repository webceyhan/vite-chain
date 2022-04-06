import { Router } from 'express';
import { Chain } from '../../core';
import { serializeTransaction } from '../../serialization';

export default (chain: Chain) => {
    // define router
    const router = Router();

    /**
     * Get all transactions.
     */
    router.get('/', (req, res) => {
        try {
            // get by block height
            if (req.query.block) {
                // parse height param
                const height = +req.query.block;

                // try to find block by height
                const block = chain.findBlockByHeight(height);
                const txs = block.transactions.map(serializeTransaction);

                return res.json(txs);
            }

            // get by address
            if (req.query.address) {
                // parse address param
                const address = req.query.address as string;

                // try to find all transactions by address
                const transactions = chain.findTransactionsByAddress(address);
                const txs = transactions.map(serializeTransaction);

                return res.json(txs);
            }

            // return all transactions from last block
            res.json(chain.lastBlock.transactions.map(serializeTransaction));
        } catch (error) {
            res.status(404).json((error as Error).message);
        }
    });

    /**
     * Get transaction by hash.
     */
    router.get('/:hash', (req, res) => {
        // parse hash param
        const hash = req.params.hash;

        try {
            // try to find transaction by hash
            const tx = chain.findTransaction(hash);
            res.json(serializeTransaction(tx));
        } catch (error) {
            res.status(404).json((error as Error).message);
        }
    });

    return router;
};
