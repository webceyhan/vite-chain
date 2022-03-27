import { Block } from './Block';
import { BlockChain } from './BlockChain';

const genesisBlock = new Block(0, '', [], 1545184500, '0');
const blockChain = new BlockChain([genesisBlock]);

console.log(blockChain);
