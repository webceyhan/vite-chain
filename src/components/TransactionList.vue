<script setup lang="ts">

import { PropType } from 'vue';
import ListGroup from './common/ListGroup.vue';
import ListGroupItem from './common/ListGroupItem.vue';
import Timestamp from './common/Timestamp.vue';
import Icon from './common/Icon.vue';

defineProps({
    transactions: { type: Array as PropType<any[]>, default: () => [] },
})

</script>

<template>
    <header class="d-flex justify-content-between align-items-center">
        <h5>
            <Icon name="tx" class="me-2" :spin-watch="transactions" />Transactions
        </h5>
        <router-link
            class="small link-secondary text-decoration-none"
            :to="{ name: 'transactions' }"
        >View All>></router-link>
    </header>

    <ListGroup flush class="overflow-auto" style="height: 387px;">
        <ListGroupItem v-for="(tx, i) in transactions" :key="i" hover>
            <!-- hash -->
            <div class="col-8 text-truncate">
                <span class="me-1">TX#</span>
                <router-link :to="{ name: 'transaction', params: { hash: tx.hash } }">{{ tx.hash }}</router-link>
            </div>

            <!-- timestamp -->
            <div class="col-4 text-end text-muted">
                <Timestamp :value="tx.timestamp" />
            </div>

            <hr class="bg-transparent mb-1" />

            <!-- from -->
            <div class="col-6 small text-truncate">
                <span class="me-1 text-muted">From</span>
                <router-link
                    class="link-dark"
                    :to="{ name: 'wallet', params: { address: tx.from } }"
                >{{ tx.from }}</router-link>
            </div>

            <!-- to -->
            <div class="col-6 small text-truncate">
                <span class="me-1 text-muted">To</span>
                <router-link
                    class="link-dark"
                    :to="{ name: 'wallet', params: { address: tx.to } }"
                >{{ tx.to }}</router-link>
            </div>
        </ListGroupItem>
    </ListGroup>
</template>
