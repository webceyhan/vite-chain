import { Router } from 'express';
import { Node } from '../../node';
import { serializeTransaction } from '../../serialization';

export default (node: Node) => {
    // define router
    const router = Router();

    /**
     * Get all addresses.
     */
    router.get('/', (req, res) => {
        res.json(
            node.chain.addresses.map((address) => ({
                address,
                balance: node.chain.findBalance(address),
            }))
        );
    });

    /**
     * Get all wallet information by address.
     */
    router.get('/:address', (req, res) => {
        // parse address param
        const address = req.params.address;

        try {
            // try to find wallet info
            res.json({
                address,
                balance: node.chain.findBalance(address),
                transactions: node.chain
                    .findTransactionsByAddress(address)
                    .map(serializeTransaction),
            });
        } catch (error) {
            res.status(404).json((error as Error).message);
        }
    });

    return router;
};
