const API_URL = 'http://localhost:8080/api';

export interface Chain {
    totalBlocks: number;
    totalWallets: number;
    totalTransactions: number;
    lastBlockTimestamp: number;
}

export interface Transaction {
    blockHeight: number;
    hash: string;
    from: string;
    to: string;
    amount: number;
    fee: number;
    signature: string;
    timestamp: number;
}

export interface Block {
    height: number;
    hash: string;
    parentHash: string;
    difficulty: number;
    nonce: number;
    miner: string;
    transactions: Transaction[];
    txCount?: number; // placeholder
    reward: number;
    timestamp: number;
}

export interface Wallet {
    address: string;
    balance: number;
    transactions: Transaction[];
    txCount?: number; // placeholder
}

const fetchApi = async <T = any>(path: string, q = {}, params = {}) => {
    const url = new URL(`${API_URL}/${path}`);
    url.search = new URLSearchParams(q) as any;

    return (await fetch(url.toString(), params)).json() as Promise<T>;
};

export const createSSE = (path: string) =>
    new EventSource(`${API_URL}/sse/${path}`);

export const findBlocks = async (q: {}) => fetchApi<Block[]>('blocks', q);

export const findBlock = async (height: number) =>
    fetchApi<Block>(`blocks/${height}`);

export const findTransactions = async (q: {}) =>
    fetchApi<Transaction[]>('transactions', q);

export const sendTransaction = async (tx: Partial<Transaction>) =>
    fetchApi<Transaction>(
        'transactions',
        {},
        {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },

            method: 'POST',
            body: JSON.stringify(tx),
        }
    );

export const findTransaction = async (hash: string) =>
    fetchApi<Transaction>(`transactions/${hash}`);

export const findWallets = async (q: {}) => fetchApi<Wallet[]>('wallets', q);

export const findWallet = async (address: string) =>
    fetchApi<Wallet>(`wallets/${address}`);
