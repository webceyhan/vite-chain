<script setup lang="ts">
defineProps<{ value?: any }>();
</script>

<template>
  <slot v-if="value !== undefined" />

  <p v-else class="placeholder-glow">
    <span class="placeholder placeholder-xs bg-secondary col-12"></span>
  </p>
</template>

