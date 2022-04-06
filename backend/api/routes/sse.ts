import { Router } from 'express';
import { sse } from '../middlewares';
import { Block, Chain, Transaction } from '../../core';

export default (chain: Chain) => {
    // define router
    const router = Router();

    /**
     * Send chain:updated events to the client.
     */
    router.get('/chain', sse(), (req, res) => {
        const onUpdate = () =>
            res.send({
                totalBlocks: chain.size,
                totalWallets: chain.addressSize,
                totalTransactions: chain.transactionSize,
                lastBlockTimestamp: chain.lastBlock.timestamp,
            });

        chain.on('chain:updated', onUpdate);

        // remove listener on response end
        req.on('close', () => chain.off('chain:updated', onUpdate));
    });

    /**
     * Send block:added events to the client.
     */
    router.get('/block', sse(), (req, res) => {
        const onUpdate = (block: Block) => {
            // include txCount instead of transactions
            const { transactions, ...state } = block;
            res.send(state);
        };

        chain.on('block:added', onUpdate);

        // remove listener on response end
        req.on('close', () => chain.off('block:added', onUpdate));
    });

    /**
     * Send transaction:added events to the client.
     */
    router.get('/transaction', sse(), (req, res) => {
        const onUpdate = (tx: Transaction) => res.send(tx);

        chain.on('transaction:added', onUpdate);

        // remove listener on response end
        req.on('close', () => chain.off('transaction:added', onUpdate));
    });

    return router;
};
