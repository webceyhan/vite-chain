import { Chain, Wallet } from './core';

// create miner wallet
export const miner = new Wallet();

// create blockchain instance
export const chain = new Chain(miner.address);

chain.startMiningLoop();
