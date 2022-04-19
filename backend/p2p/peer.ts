import { v4 as uuid } from 'uuid';
import { WebSocket, RawData } from 'ws';
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
            case 'queryChain':
                return this.responseChain();

            case 'queryLastBlock':
                return this.responseLastBlock();

            case 'queryTransactions':
                return this.responseTransactions();

            case 'newTransaction':
                return this.node.addTransaction(data);

            case 'newBlock':
            case 'responseLastBlock': {
                const { index, hash } = this.node.lastBlock;

                // check if block is ahead of current chain
                if (data.parentHash === hash && data.index > index) {
                    return this.node.addBlock(data);
                } else {
                    return this.queryChain();
                }
            }

            case 'responseChain':
                return this.node.replaceChain(data);
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

    queryChain() {
        this.send('queryChain');
    }

    queryLastBlock() {
        this.send('queryLastBlock');
    }

    queryTransactions() {
        this.send('queryTransactions');
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
