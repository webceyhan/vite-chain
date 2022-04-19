import { RawData } from 'ws';

export type MessageName =
    | 'newTransaction'
    | 'newBlock'
    | 'queryChain'
    | 'responseChain'
    | 'queryLastBlock'
    | 'responseLastBlock'
    | 'queryTransactions'
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
