import { Router } from 'express';
import { Node } from '../../node';

export default (node: Node) => {
    // define router
    const router = Router();

    /**
     * Get all blocks.
     */
    router.get('/', (req, res) => {
        res.json(node.findBlocks());
    });

    /**
     * Get block by index.
     */
    router.get('/:index', (req, res) => {
        // parse index param
        const index = +req.params.index;

        try {
            // try to find block by height
            res.json(node.findBlock({ index }));
        } catch (error) {
            res.status(404).json((error as Error).message);
        }
    });

    return router;
};
