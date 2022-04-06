<script setup lang="ts">

import { ref, watch } from 'vue';

const props = defineProps({
    spinWatch: { required: false },
    name: { type: String, required: true },
});

const iconMap: { [key: string]: string } = {
    block: 'bi-hdd-stack',
    tx: 'bi-credit-card',
    wallet: 'bi-wallet2',
    time: 'bi-clock-history',
    copy: 'bi-clipboard2-check',
    asc: 'bi-sort-up',
    desc: 'bi-sort-down',
};

const spin = ref(false);

props.spinWatch && watch(props.spinWatch as any, () => {
    setTimeout(() => spin.value = false, 1000);
    spin.value = true;
});

</script>

<template>
    <i :class="`bi ${iconMap[name]} ${spin ? 'bi-spin' : ''} text-muted`"></i>
</template>

<style scoped>
.bi-spin {
    display: inline-block;
    animation: spin-animation 1s linear infinite;
    line-height: 1;
}
@keyframes spin-animation {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>