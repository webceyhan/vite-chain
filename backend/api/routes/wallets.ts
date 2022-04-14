import { Router } from 'express';
import { Node } from '../../node';

export default (node: Node) => {
    // define router
    const router = Router();

    /**
     * Get all addresses.
     */
    router.get('/', (req, res) => {
        res.json(node.findWallets());
    });

    /**
     * Get all wallet information by address.
     */
    router.get('/:address', (req, res) => {
        // parse address param
        const address = req.params.address;

        try {
            // try to find wallet info
            res.json(node.findWallet({ address }));
        } catch (error) {
            res.status(404).json((error as Error).message);
        }
    });

    return router;
};
