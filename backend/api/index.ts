import { createServer } from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Chain } from '../core';
import { PORT, HOSTNAME } from '../constants';
import sseRouter from './routes/sse';
import blocksRouter from './routes/blocks';
import transactionsRouter from './routes/transactions';
import walletsRouter from './routes/wallets';

export const createAPI = (chain: Chain) => {
    // create express app
    const app = express();

    // create http server
    const server = createServer(app);

    // enable cors
    app.use(cors());

    // enable json body parser
    app.use(bodyParser.json());

    // define routes
    app.use('/api/sse', sseRouter(chain));
    app.use('/api/blocks', blocksRouter(chain));
    app.use('/api/transactions', transactionsRouter(chain));
    app.use('/api/wallets', walletsRouter(chain));

    // start listening
    server.listen(PORT, HOSTNAME, () =>
        console.log(`server started: http://${HOSTNAME}:${PORT}`)
    );

    return server;
};
