import { Node } from './node';
import { createAPIServer } from './api';
import { createP2PServer } from './p2p';
// import { useLogger } from './logger';
import { useFaker } from './faker';

// create blockchain node
const node = new Node();

// create API server
const apiServer = createAPIServer(node);

// // create p2p server
const p2pServer = createP2PServer(node, apiServer);

// log node events
// node.isMaster && useLogger(node);

// fake user transactions
node.isMaster && useFaker(node);

// start mining
node.startMiningLoop();
