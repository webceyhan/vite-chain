<script setup lang="ts">

import { formatDate, formatTimeAgo } from '../../utils';

defineProps({
    ago: { type: Boolean, default: false },
    value: { type: [String, Number], default: 0 },
});

</script>

<template>
    <span class="timestamp">{{ ago ? formatTimeAgo(value) : formatDate(value) }}</span>
</template>
