<script setup lang="ts">

import { PropType } from 'vue';
import ListGroup from './common/ListGroup.vue';
import ListGroupItem from './common/ListGroupItem.vue';
import Timestamp from './common/Timestamp.vue';
import Currency from './common/Currency.vue';
import Icon from './common/Icon.vue';

defineProps({
    blocks: { type: Array as PropType<any[]>, default: () => [] },
})

</script>

<template>
    <header class="d-flex justify-content-between align-items-center">
        <h5>
            <Icon name="block" class="me-2" :spin-watch="blocks" />Blocks
        </h5>
        <router-link
            class="small link-secondary text-decoration-none"
            :to="{ name: 'blocks' }"
        >View All>></router-link>
    </header>

    <ListGroup flush class="overflow-auto" style="height: 387px;">
        <ListGroupItem v-for="(block, i) in blocks" :key="i" hover>
            <!-- height -->
            <div class="col-7">
                <span class="me-1">Block</span>
                <router-link
                    :to="{ name: 'block', params: { id: block.height } }"
                >{{ block.height }}</router-link>
            </div>

            <!-- timestamp -->
            <div class="col-5 text-end text-muted">
                <Timestamp :value="block.timestamp" ago />
            </div>

            <hr class="bg-transparent mb-1" />

            <!-- transaction count -->
            <div class="col-7 small">
                <span class="me-1 text-muted">Includes</span>
                <router-link
                    :to="{ name: 'transactions', query: { block: block.height } }"
                >{{ block.txCount }} Txns</router-link>
            </div>

            <div class="col-5 small text-end">
                <span class="me-1 text-muted">Reward</span>
                <Currency :value="block.reward" />
            </div>
        </ListGroupItem>
    </ListGroup>
</template>
