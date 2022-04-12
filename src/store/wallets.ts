import { computed, reactive } from 'vue';
import * as api from './api';

const state = reactive({
    wallets: [] as api.Wallet[],
    one: null as api.Wallet | null,
    loading: false,
});

const load = async (q = {}) => {
    state.loading = true;
    state.wallets = await api.findWallets(q);
    state.loading = false;
};

const loadOne = async (hash: any) => {
    state.one = await api.findWallet(hash);
};

const transfer = async (tx: any) => {
    await api.sendTransaction(tx);
};

export const useWallets = () => ({
    load,
    loadOne,
    transfer,
    wallet: computed(() => state.one),
    wallets: computed(() => state.wallets),
    loading: computed(() => state.loading),
});
