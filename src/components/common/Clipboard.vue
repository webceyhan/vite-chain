<script setup lang="ts">

import Icon from './Icon.vue';

const props = defineProps(['value']);

function onClick() {
    navigator.clipboard.writeText(props.value);
}

</script>

<template>
    <button class="btn btn-link p-0" @click="onClick">
        <Icon name="copy" />
    </button>
</template>