import { Router } from 'express';
import { Chain } from '../../core';
import { serializeTransaction } from '../../serialization';

export default (chain: Chain) => {
    // define router
    const router = Router();

    /**
     * Get all addresses.
     */
    router.get('/', (req, res) => {
        res.json(chain.addresses);
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
                balance: chain.findBalance(address),
                transactions: chain
                    .findTransactionsByAddress(address)
                    .map(serializeTransaction),
            });
        } catch (error) {
            res.status(404).json((error as Error).message);
        }
    });

    return router;
};
