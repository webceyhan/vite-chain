import { Router } from 'express';
import { sse } from '../middlewares';
import { Node } from '../../node';
import { Block, Chain, Transaction } from '../../core';
import { serializeBlock, serializeTransaction } from '../../serialization';

export default (node: Node) => {
    // define router
    const router = Router();

    /**
     * Send chain:updated events to the client.
     */
    router.get('/chain', sse(), (req, res) => {
        // define event listener
        const handler = (chain: Chain) =>
            res.send({
                totalBlocks: chain.size,
                totalWallets: chain.addressSize,
                totalTransactions: chain.transactionSize,
                lastBlockTimestamp: chain.lastBlock.timestamp,
            });

        node.on('chain:updated', handler);

        // remove listener on response end
        req.on('close', () => node.off('chain:updated', handler));
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

        node.on('block:added', handler);

        // remove listener on response end
        req.on('close', () => node.off('block:added', handler));
    });

    /**
     * Send transaction:added events to the client.
     */
    router.get('/transaction', sse(), (req, res) => {
        // define event listener
        const handler = (tx: Transaction) => res.send(serializeTransaction(tx));

        node.on('transaction:added', handler);

        // remove listener on response end
        req.on('close', () => node.off('transaction:added', handler));
    });

    return router;
};
