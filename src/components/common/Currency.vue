<script setup lang="ts">

import { formatCurrency } from '../../utils';

defineProps({
    value: { type: [String, Number], default: 0 },
});

</script>

<template>
    <span class="currency">
        {{ formatCurrency(+value) }}
        <small>VTC</small>
    </span>
</template>
