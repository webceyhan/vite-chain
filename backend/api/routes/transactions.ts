import { Router } from 'express';
import { Node } from '../../node';

export default (node: Node) => {
    // define router
    const router = Router();

    /**
     * Get all transactions.
     */
    router.get('/', (req, res) => {
        try {
            // get by block index
            if (req.query.block) {
                // parse block index param
                const block = +req.query.block;

                // try to find transactions by block index
                return res.json(node.findTransactions({ block }));
            }

            // get by address
            if (req.query.address) {
                // parse address param
                const address = req.query.address as string;

                // try to find all transactions by address
                return res.json(node.findTransactions({ address: address }));
            }

            // return all transactions from last block
            res.json(node.findTransactions());
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
            res.json(node.findTransaction({ hash }));
        } catch (error) {
            res.status(404).json((error as Error).message);
        }
    });

    return router;
};
