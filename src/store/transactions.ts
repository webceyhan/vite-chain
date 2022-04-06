import { computed, reactive } from 'vue';
import * as api from './api';

const state = reactive({
    transactions: [] as api.Transaction[],
    one: null as api.Transaction | null,
    loading: false,
});

const load = async (q= {}) => {
    state.loading = true;
    state.transactions = await api.findTransactions(q);
    state.loading = false;
};

const loadOne = async (hash: any) => {
    state.one = await api.findTransaction(hash);
};

export const useTransactions = () => ({
    load,
    loadOne,
    transaction: computed(() => state.one),
    transactions: computed(() => state.transactions),
    loading: computed(() => state.loading),
});
