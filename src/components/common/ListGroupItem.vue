<script setup lang="ts">

defineProps({
    hover: { type: Boolean, default: false },
});

</script>

<template>
    <div class="list-group-item text-light shadow-sm p-3" :class="{ 'list-group-item-action': hover }">
        <div class="row align-items-center">
            <slot>
                <div class="col-4 col-lg-2 text-muted">
                    <slot name="label"></slot>
                </div>
                <div class="col text-truncate">
                    <slot name="value"></slot>
                </div>
                <div class="col-auto">
                    <slot name="end"></slot>
                </div>
            </slot>
        </div>
    </div>
</template>

<style>
.list-group-item{
    background-color: #393f467e !important;
    border-color: rgba(0, 0, 0, 0.555) !important;
}
.list-group-item-action:hover {
    background-color: #393f46ad !important;
    
}
.list-group-item a.link-dark {
    color: #98a4ad !important;
}
.list-group-item a.link-dark:hover {
    color: #98a4adbd !important;
}
</style>