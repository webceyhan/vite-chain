import { Chain, Wallet } from './core';
import { createLogger } from './logger';

// create miner wallet
export const miner = new Wallet();

// create blockchain instance
export const chain = new Chain(miner.address);

// create logger for chain events
export const logger = createLogger(chain);

chain.startMiningLoop();
