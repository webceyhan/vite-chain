import { Block, BlockChain, Transaction } from './core';

const genesisTx = new Transaction('0', 'miner', 100);

const genesisBlock = new Block(0, '', [genesisTx], 1545184500);

const blockChain = new BlockChain([genesisBlock]);


console.log(blockChain);
