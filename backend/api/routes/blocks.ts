import { Router } from 'express';
import { Chain } from '../../core';
import { serializeBlock } from '../../serialization';

export default (chain: Chain) => {
    // define router
    const router = Router();

    /**
     * Get all blocks.
     */
    router.get('/', (req, res) => {
        res.json(chain.blocks.map(serializeBlock));
    });

    /**
     * Get block by height.
     */
    router.get('/:height', (req, res) => {
        // parse height param
        const height = +req.params.height;

        try {
            // try to find block by height
            const block = chain.findBlockByHeight(height);
            res.json(serializeBlock(block));
        } catch (error) {
            res.status(404).json((error as Error).message);
        }
    });

    return router;
};
