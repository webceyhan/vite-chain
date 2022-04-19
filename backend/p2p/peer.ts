import { v4 as uuid } from 'uuid';
import { WebSocket, RawData } from 'ws';
import { deserializeBlock, deserializeTransaction } from '../serialization';
import { MessageName, parseMessage, serializeMessage } from './message';
import { Node } from '../node';

export class Peer {
    /**
     * Shared Peer pool.
     */
    static readonly pool = new Set<Peer>();

    constructor(
        /**
         * WebsSocket instance of the peer.
         */
        public readonly ws: WebSocket,

        /**
         * Peer node.
         */
        public readonly node: Node,

        /**
         * Unique id of the peer.
         */
        public readonly id = uuid()
    ) {
        // initialize event listeners
        ws.on('ping', () => this.#keepAlive());
        ws.on('close', () => this.#onDisconnect());
        ws.on('error', () => this.#onDisconnect());
        ws.on('message', (raw) => this.#onMessage(raw));

        // keep connection alive
        this.#keepAlive();
    }

    /**
     * Send message to peer.
     */
    send(name: MessageName, data?: any) {
        this.ws.send(serializeMessage({ name, data }));
    }

    /**
     * Handle peer message.
     */
    #onMessage(raw: RawData): void {
        const { name, data } = parseMessage(raw);
        console.log('message received:', name);

        switch (name) {
            case 'newTransaction':
                const tx = deserializeTransaction(data);
                this.node.addTransaction(tx);
                break;

            case 'newBlock':
                const block = deserializeBlock(data);
                this.node.addBlock(block);
                break;

            case 'queryChainSize':
                this.responseChainSize();
                break;

            case 'queryChain':
                this.responseChain();
                break;

            case 'queryLastBlock':
                this.responseLastBlock();
                break;

            case 'queryTransactions':
                this.responseTransactions();
                break;
        }
    }

    /**
     * Handle peer disconnection.
     */
    #onDisconnect() {
        // terminate connection
        this.ws.terminate();

        // remove peer from pool
        Peer.pool.delete(this);

        console.log('peer disconnected:', this.id);
    }

    /**
     * Handle peer ping to keep connection alive
     * by pinging back to peer on every 30 seconds.
     */
    #keepAlive() {
        setTimeout(() => this.ws.ping(), 30000);
    }

    // MESSAGES ////////////////////////////////////////////////////////////////////////////////////

    queryChainSize() {
        this.send('queryChainSize');
    }

    queryChain() {
        this.send('queryChain');
    }

    queryLastBlock() {
        this.send('queryLastBlock');
    }

    queryTransactions() {
        this.send('queryTransactions');
    }

    responseChainSize() {
        this.send('responseChainSize', this.node.chainSize);
    }

    responseChain() {
        this.send('responseChain', this.node.blocks);
    }

    responseLastBlock() {
        this.send('responseLastBlock', this.node.lastBlock);
    }

    responseTransactions() {
        this.send('responseTransactions', this.node.pendingTransactions);
    }

    // STATIC METHODS //////////////////////////////////////////////////////////////////////////////

    /**
     * Create new peer connection.
     */
    static create(ws: WebSocket, node: Node): Peer {
        // create new peer
        const peer = new Peer(ws, node);

        // add peer to pool
        Peer.pool.add(peer);

        // return peer
        return peer;
    }

    /**
     * Create new peer connection to master node.
     */
    static createMaster(node: Node): Peer {
        return new Peer(new WebSocket(`ws://${Node.ADDRESS}`), node);
    }

    /**
     * Send message to all peers.
     */
    static broadcast(name: MessageName, data?: any) {
        Peer.pool.forEach((peer) => peer.send(name, data));
    }
}
