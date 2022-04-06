<script setup lang="ts">

defineProps({
    flush: { type: Boolean, default: false },
});

</script>

<template>
    <div class="list-group small" :class="{ 'list-group-flush': flush }">
        <slot></slot>
    </div>
</template>

