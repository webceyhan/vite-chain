import { Router } from 'express';
import { Node } from '../../node';
import { serializeBlock } from '../../serialization';

export default (node: Node) => {
    // define router
    const router = Router();

    /**
     * Get all blocks.
     */
    router.get('/', (req, res) => {
        res.json(node.chain.blocks.map(serializeBlock));
    });

    /**
     * Get block by height.
     */
    router.get('/:height', (req, res) => {
        // parse height param
        const height = +req.params.height;

        try {
            // try to find block by height
            const block = node.chain.findBlockByHeight(height);
            res.json(serializeBlock(block));
        } catch (error) {
            res.status(404).json((error as Error).message);
        }
    });

    return router;
};
