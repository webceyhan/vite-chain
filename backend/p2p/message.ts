import { RawData } from 'ws';
import { Node } from '../node';

export type MessageName =
    | 'newTransaction'
    | 'newBlock'
    //
    | 'queryChainSize'
    | 'queryChain'
    | 'queryLastBlock'
    | 'queryTransactions'
    //
    | 'responseChainSize'
    | 'responseChain'
    | 'responseLastBlock'
    | 'responseTransactions';

export type Message = {
    name: MessageName;
    data?: any;
};

export type MesasageHandler = (data: any) => void;

/**
 * Parse message from raw data.
 */
export const parseMessage = (raw: RawData): Message =>
    JSON.parse(raw.toString());

/**
 * Serialize message to raw data.
 */
export const serializeMessage = (message: Message): string =>
    JSON.stringify(message);

const createMessage = (name: MessageName, data?: any): Message => ({
    name,
    data,
});

export const useMessages = (node: Node) => {
    // chain event messages
    const newTransaction = (tx: any) => createMessage('newTransaction', tx);
    const newBlock = (block: any) => createMessage('newBlock', block);

    // define query messages
    const queryChain = () => createMessage('queryChain');
    const queryChainSize = () => createMessage('queryChainSize');
    const queryLastBlock = () => createMessage('queryLastBlock');
    const queryTransactions = () => createMessage('queryTransactions');

    // define response messages
    const responseChainSize = () =>
        createMessage('responseChainSize', node.chainSize);

    const responseChain = () => createMessage('responseChain', node.blocks);

    const responseLastBlock = () =>
        createMessage('responseLastBlock', node.lastBlock);

    const responseTransactions = () =>
        createMessage('responseTransactions', node.pendingTransactions);

    return {
        newTransaction,
        newBlock,
        //
        queryChainSize,
        queryChain,
        queryLastBlock,
        queryTransactions,
        responseChainSize,
        responseChain,
        responseLastBlock,
        responseTransactions,
    };
};
