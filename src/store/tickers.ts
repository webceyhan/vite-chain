import { ref } from 'vue';
import * as api from './api';

const MAX_ITEMS = 10;

const chain = ref<api.Chain>({} as any);
const latestBlocks = ref<api.Block[]>([]);
const latestTransactions = ref<api.Transaction[]>([]);

let chainSSE: EventSource;
let blockSSE: EventSource;
let transactionSSE: EventSource;

const connect = () => {
    chainSSE = api.createSSE('chain');
    blockSSE = api.createSSE('block');
    transactionSSE = api.createSSE('transaction');

    // update chain data
    chainSSE.onmessage = ({ data }) => (chain.value = JSON.parse(data));

    blockSSE.onmessage = ({ data }) => {
        // add new block to the beginning of the array
        latestBlocks.value.unshift(JSON.parse(data));

        // remove the last block if the array is too long
        if (latestBlocks.value.length > MAX_ITEMS) {
            latestBlocks.value.pop();
        }
    };

    transactionSSE.onmessage = ({ data }) => {
        // add new transaction to the beginning of the array
        latestTransactions.value.unshift(JSON.parse(data));

        // remove the last transaction if the array is too long
        if (latestTransactions.value.length > MAX_ITEMS) {
            latestTransactions.value.pop();
        }
    };
};

const disconnect = () => {
    chainSSE.close();
    blockSSE.close();
    transactionSSE.close();
};

export const useTickers = () => ({
    chain,
    latestBlocks,
    latestTransactions,
    connect,
    disconnect,
});
