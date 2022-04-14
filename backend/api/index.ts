import { createServer } from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sseRouter from './routes/sse';
import blocksRouter from './routes/blocks';
import transactionsRouter from './routes/transactions';
import walletsRouter from './routes/wallets';
import { Node } from '../node';

export const createAPI = (node: Node) => {
    // create express app
    const app = express();

    // create http server
    const server = createServer(app);

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
    server.listen(Node.PORT, Node.HOSTNAME, () =>
        console.log(`server started: http://${Node.HOSTNAME}:${Node.PORT}`)
    );

    return server;
};
