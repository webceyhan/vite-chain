<script setup lang="ts">

import { watch } from 'vue';
import { useRoute } from 'vue-router'
import { useTransactions } from '../store/transactions'
import Currency from '../components/common/Currency.vue';
import Timestamp from '../components/common/Timestamp.vue';
import ListGroup from '../components/common/ListGroup.vue';
import ListGroupItem from '../components/common/ListGroupItem.vue';
import Icon from '../components/common/Icon.vue';

const { transactions, load } = useTransactions();

const route = useRoute();

watch(route, () => {
  if (route.name != 'transactions') return;
  load(route.query)
});

load(route.query);

</script>

<template>
  <section>
    <h2>
      <Icon name="tx" class="me-2" />Transactions
    </h2>

    <!-- header -->
    <div class="d-none d-lg-flex row p-3">
      <div class="col-2">Hash</div>
      <div class="col">Height</div>
      <div class="col">Age</div>
      <div class="col-2">From</div>
      <div class="col-2">To</div>
      <div class="col text-end">Amount</div>
      <div class="col text-end">Fee</div>
    </div>

    <ListGroup flush>
      <ListGroupItem class="mb-2 mb-lg-0" v-for="(tx, i) in transactions" :key="i" hover>
        <!-- hash -->
        <div class="col-8 col-lg-2 text-truncate">
          <router-link :to="{ name: 'transaction', params: { hash: tx.hash } }">{{ tx.hash }}</router-link>
        </div>

        <!-- height: lg only -->
        <div class="d-none d-lg-flex col-lg">
          <span class="d-lg-none text-muted me-1">Height:</span>
          <span>{{ tx.blockHeight }}</span>
        </div>

        <!-- date: no lg -->
        <div class="d-lg-none col-4 text-truncate text-end">
          <Timestamp :value="tx.timestamp" />
        </div>

        <!-- age: lg only -->
        <div class="d-none d-lg-flex col-lg">
          <Timestamp :value="tx.timestamp" ago />
        </div>

        <!-- divider: no lg -->
        <div class="d-lg-none col-12">
          <hr class="bg-secondary bg-opacity-50 my-2" />
        </div>

        <!-- from -->
        <div class="col-7 col-lg-2 text-truncate order-0">
          <span class="d-lg-none text-muted me-1">From:</span>
          <span v-if="tx.from === '0'">{{ tx.from }}</span>
          <router-link v-else :to="{ name: 'wallet', params: { address: tx.from } }">{{ tx.from }}</router-link>
        </div>

        <!-- to -->
        <div class="col-7 col-lg-2 text-truncate order-2 order-lg-1">
          <span class="d-lg-none text-muted me-1">To:</span>
          <router-link :to="{ name: 'wallet', params: { address: tx.to } }">{{ tx.to }}</router-link>
        </div>

        <!-- value -->
        <div class="col-5 col-lg text-end order-1 order-lg-2">
          <span class="d-lg-none text-muted me-1">Amount:</span>
          <Currency :value="tx.amount" />
        </div>

        <!-- fee -->
        <div class="col-5 col-lg text-end order-3 order-lg-3">
          <span class="d-lg-none text-muted me-1">Fee:</span>
          <Currency :value="tx.fee" />
        </div>
      </ListGroupItem>
    </ListGroup>
  </section>
</template>
