import { createServer, Server } from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sseRouter from './routes/sse';
import blocksRouter from './routes/blocks';
import transactionsRouter from './routes/transactions';
import walletsRouter from './routes/wallets';
import { Node } from '../node';

export const createAPIServer = (node: Node): Server => {
    // create express app
    const app = express();

    // create http server
    const server = createServer(app);

    // define full url of API server
    const url = `http://localhost:${node.port}`;

    // enable cors
    app.use(cors());

    // enable json body parser
    app.use(bodyParser.json());

    // define routes
    app.use('/api/sse', sseRouter(node));
    app.use('/api/blocks', blocksRouter(node));
    app.use('/api/transactions', transactionsRouter(node));
    app.use('/api/wallets', walletsRouter(node));

    // start listening
    server.listen(node.port, () => {
        console.log(`API server listening on ${url}`);
    });

    return server;
};
