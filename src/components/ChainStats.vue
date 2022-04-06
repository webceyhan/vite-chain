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
            <div class="col-auto">
                <Icon name="time" class="h1" />
            </div>
            <div class="col">
                <div class="fw-bold">
                    <Timestamp :value="stats.lastBlockTimestamp" />
                </div>
                <small class="text-muted">Time of last block</small>
            </div>
        </ListGroupItem>

        <ListGroupItem class="flex-fill p-lg-4">
            <div class="col-auto">
                <Icon name="block" class="h1" />
            </div>
            <div class="col">
                <div class="fw-bold">{{ stats.totalBlocks }}</div>
                <small class="text-muted">Total Blocks</small>
            </div>
        </ListGroupItem>

        <ListGroupItem class="flex-fill p-lg-4">
            <div class="col-auto">
                <Icon name="tx" class="h1" />
            </div>
            <div class="col">
                <div class="fw-bold">{{ stats.totalTransactions }}</div>
                <small class="text-muted">Total Transactions</small>
            </div>
        </ListGroupItem>

        <ListGroupItem class="flex-fill p-lg-4">
            <div class="col-auto">
                <Icon name="wallet" class="h1" />
            </div>
            <div class="col">
                <div class="fw-bold">{{ stats.totalWallets }}</div>
                <small class="text-muted">Total Wallets</small>
            </div>
        </ListGroupItem>
    </ListGroup>
</template>
