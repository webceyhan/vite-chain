import { computed, reactive } from 'vue';
import * as api from './api';

const state = reactive({
    blocks: [] as api.Block[],
    one: null as api.Block | null,
    loading: false,
});

const load = async (q = {}) => {
    state.loading = true;
    state.blocks = await api.findBlocks(q);
    state.loading = false;
};

const loadOne = async (height: any) => {
    state.one = await api.findBlock(height);
};

export const useBlocks = () => ({
    load,
    loadOne,
    block: computed(() => state.one),
    blocks: computed(() => state.blocks),
    loading: computed(() => state.loading),
});
