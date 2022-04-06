<script setup lang="ts">

import { watch } from 'vue';
import { useRoute } from 'vue-router'
import { useTransactions } from '../store/transactions';
import ListGroup from '../components/common/ListGroup.vue';
import ListGroupItem from '../components/common/ListGroupItem.vue';
import Currency from '../components/common/Currency.vue';
import Timestamp from '../components/common/Timestamp.vue';
import Icon from '../components/common/Icon.vue';

const route = useRoute();
const { transaction, loadOne } = useTransactions();

loadOne(route.params.hash);

watch(() => route.params.hash, (hash) => hash && loadOne(hash));

</script>

<template>
  <section>
    <h2>
      <Icon name="tx" class="me-2" />Transaction Details
    </h2>

    <p v-if="!transaction">not found</p>

    <ListGroup v-else>
      <!-- hash -->
      <ListGroupItem>
        <template #label>Hash:</template>
        <template #value>{{ transaction.hash }}</template>
      </ListGroupItem>

      <!-- block height -->
      <ListGroupItem>
        <template #label>Block Height:</template>
        <template #value>
          <router-link
            :to="{ name: 'block', params: { id: transaction.blockHeight } }"
          >#{{ transaction.blockHeight }}</router-link>
        </template>
      </ListGroupItem>

      <!-- timestamp -->
      <ListGroupItem>
        <template #label>Timestamp:</template>
        <template #value>
          <span class="d-none d-lg-inline me-1">
            <Timestamp :value="transaction.timestamp" ago />,
          </span>
          <Timestamp :value="transaction.timestamp" />
        </template>
      </ListGroupItem>

      <!-- from -->
      <ListGroupItem>
        <template #label>From:</template>
        <template #value>
          <router-link
            :to="{ name: 'wallet', params: { address: transaction.from } }"
          >{{ transaction.from }}</router-link>
        </template>
      </ListGroupItem>

      <!-- to -->
      <ListGroupItem>
        <template #label>To:</template>
        <template #value>
          <router-link
            :to="{ name: 'wallet', params: { address: transaction.to } }"
          >{{ transaction.to }}</router-link>
        </template>
      </ListGroupItem>

      <!-- signature -->
      <ListGroupItem>
        <template #label>Signature:</template>
        <template #value>{{ transaction.signature }}</template>
      </ListGroupItem>

      <!-- amount -->
      <ListGroupItem>
        <template #label>Amount:</template>
        <template #value>
          <Currency :value="transaction.amount" />
        </template>
      </ListGroupItem>

      <!-- fee -->
      <ListGroupItem>
        <template #label>Fee:</template>
        <template #value>
          <Currency :value="transaction.fee" />
        </template>
      </ListGroupItem>
    </ListGroup>
  </section>
</template>
