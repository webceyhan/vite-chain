import { Node } from './node';
import { Chain } from './core';
import { Wallet } from './wallet';
import { createLogger } from './logger';
import { createAPI } from './api';

// create miner wallet
export const miner = new Wallet();

// create blockchain instance
export const chain = new Chain();

// create blockchain node instance
export const node = new Node(miner, chain);

// create logger for node events
export const logger = createLogger(node);

// create API server
export const api = createAPI(node);

node.startMiningLoop();
