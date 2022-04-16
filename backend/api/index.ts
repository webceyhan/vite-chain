import { createServer } from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sseRouter from './routes/sse';
import blocksRouter from './routes/blocks';
import transactionsRouter from './routes/transactions';
import walletsRouter from './routes/wallets';
import { Node } from '../node';

export type Server = ReturnType<typeof createServer> & {
    port: number;
    hostname: string;
    url: string;
};

export const createAPI = (node: Node): Server => {
    // create express app
    const app = express();

    // create http server
    const server = createServer(app) as Server;

    // set port, hostname and url
    server.port = (process.env.PORT as any) ?? Node.PORT;
    server.hostname = process.env.HOSTNAME ?? Node.HOSTNAME;
    server.url = `http://${server.hostname}:${server.port}`;

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
    server.listen(server.port, server.hostname, () => {
        console.log(`API server listening on ${server.url}`);
    });

    return server;
};
