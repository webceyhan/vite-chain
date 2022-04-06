import { Router } from 'express';
import { sse } from '../middlewares';
import { Block, Chain, Transaction } from '../../core';
import { serializeBlock, serializeTransaction } from '../../serialization';

export default (chain: Chain) => {
    // define router
    const router = Router();

    /**
     * Send chain:updated events to the client.
     */
    router.get('/chain', sse(), (req, res) => {
        // define event listener
        const handler = () =>
            res.send({
                totalBlocks: chain.size,
                totalWallets: chain.addressSize,
                totalTransactions: chain.transactionSize,
                lastBlockTimestamp: chain.lastBlock.timestamp,
            });

        chain.on('chain:updated', handler);

        // remove listener on response end
        req.on('close', () => chain.off('chain:updated', handler));
    });

    /**
     * Send block:added events to the client.
     */
    router.get('/block', sse(), (req, res) => {
        // define event listener
        const handler = (block: Block) => {
            // include txCount instead of transactions
            const { transactions, ...json } = serializeBlock(block);
            res.send({ ...json, txCount: transactions.length });
        };

        chain.on('block:added', handler);

        // remove listener on response end
        req.on('close', () => chain.off('block:added', handler));
    });

    /**
     * Send transaction:added events to the client.
     */
    router.get('/transaction', sse(), (req, res) => {
        // define event listener
        const handler = (tx: Transaction) => res.send(serializeTransaction(tx));

        chain.on('transaction:added', handler);

        // remove listener on response end
        req.on('close', () => chain.off('transaction:added', handler));
    });

    return router;
};
