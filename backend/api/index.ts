import { PORT, HOSTNAME } from '../constants';
import { createServer } from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Chain } from '../core';

export const createAPI = (chain: Chain) => {
    // create express app
    const app = express();

    // create http server
    const server = createServer(app);

    // enable cors
    app.use(cors());

    // enable json body parser
    app.use(bodyParser.json());

    // start listening
    server.listen(PORT, HOSTNAME, () =>
        console.log(`server started: http://${HOSTNAME}:${PORT}`)
    );

    return server;
};
