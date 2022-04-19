import { Server } from 'http';
import { WebSocket, WebSocketServer } from 'ws';
import { Node } from '../node';
import { Peer } from './peer';

export const createP2PServer = async (node: Node, server: Server) => {
    // initialize websocket server
    const wss = new WebSocketServer({ server });

    // log server start message
    console.log(`P2P server started: ws://${node.address}`);

    // listen for new peer connections
    wss.on('connection', (ws: WebSocket) => {
        // create new peer
        const peer = Peer.create(ws, node);

        // query last block
        peer.queryLastBlock();

        // log peer connected message
        console.log('peer connected:', peer.id);
    });

    // connect to master node if not master
    node.isMaster || Peer.createMaster(node);

    // broadcast transaction to peers
    node.on('transaction:added', (tx) => {
        Peer.broadcast('newTransaction', tx);
    });

    // broadcast block to peers
    node.on('block:added', (block) => {
        Peer.broadcast('newBlock', block);
    });

    // return peer server
    return wss;
};
