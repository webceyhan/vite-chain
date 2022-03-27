import { Block } from './Block';
import { BlockChain } from './BlockChain';
import { Transaction } from './Transaction';

const genesisTx = new Transaction('0', 'miner', 100);
const genesisBlock = new Block(0, '', [genesisTx], 1545184500, '0');
const blockChain = new BlockChain([genesisBlock]);

console.log(blockChain);
