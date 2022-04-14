<script setup lang="ts">

import { PropType } from 'vue';
import ListGroup from './common/ListGroup.vue';
import ListGroupItem from './common/ListGroupItem.vue';
import Timestamp from './common/Timestamp.vue';
import Icon from './common/Icon.vue';

defineProps({
    stats: { type: Object as PropType<any>, default: () => { } },
})

</script>

<template>
    <ListGroup class="list-group-horizontal-lg">
        <ListGroupItem class="flex-fill p-lg-4">
            <div class="col-auto align-self-start">
                <Icon name="time" class="h1" />
            </div>
            <div class="col">
                <small class="text-muted">Time of last block</small>
                <div class="display-6">
                    <Timestamp :value="stats.lastBlockTimestamp" />
                </div>
            </div>
        </ListGroupItem>

        <ListGroupItem class="flex-fill p-lg-4">
            <div class="col-auto align-self-start">
                <Icon name="block" class="h1" />
            </div>
            <div class="col">
                <small class="text-muted">Total Blocks</small>
                <div class="display-6">{{ stats.totalBlocks }}</div>
            </div>
        </ListGroupItem>

        <ListGroupItem class="flex-fill p-lg-4">
            <div class="col-auto align-self-start">
                <Icon name="tx" class="h1" />
            </div>
            <div class="col">
                <small class="text-muted">Total Transactions</small>
                <div class="display-6">{{ stats.totalTransactions }}</div>
            </div>
        </ListGroupItem>

        <ListGroupItem class="flex-fill p-lg-4">
            <div class="col-auto align-self-start">
                <Icon name="wallet" class="h1" />
            </div>
            <div class="col">
                <small class="text-muted">Total Wallets</small>
                <div class="display-6">{{ stats.totalWallets }}</div>
            </div>
        </ListGroupItem>
    </ListGroup>
</template>
