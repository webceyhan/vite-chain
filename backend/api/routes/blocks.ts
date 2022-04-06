import { Router } from 'express';
import { Chain } from '../../core';

export default (chain: Chain) => {
    // define router
    const router = Router();

    // get all blocks
    router.get('/', (req, res) => {
        res.json(chain.blocks);
    });

    // get block by height
    router.get('/:height', (req, res) => {
        const height = +req.params.height;
        res.json(chain.blocks[height]);
    });

    return router;
};
