import { Chain } from './core';
import { Wallet } from './wallet';
import { createLogger } from './logger';
import { createAPI } from './api';

// create miner wallet
export const miner = new Wallet();

// create blockchain instance
export const chain = new Chain(miner.address);

// create logger for chain events
export const logger = createLogger(chain);

// create API server
export const api = createAPI(chain);

chain.startMiningLoop();
