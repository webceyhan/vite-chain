<script setup lang="ts">

import { watch } from 'vue';
import { useRoute } from 'vue-router'
import { useBlocks } from '../store/blocks';
import ListGroup from '../components/common/ListGroup.vue';
import ListGroupItem from '../components/common/ListGroupItem.vue';
import Currency from '../components/common/Currency.vue';
import Timestamp from '../components/common/Timestamp.vue';
import Icon from '../components/common/Icon.vue';

const route = useRoute();
const { block, loadOne } = useBlocks();

loadOne(route.params.id);

watch(() => route.params.id, (id) => id && loadOne(id));

</script>

<template>
  <section>
    <h2>
      <Icon name="block" class="me-2" />Blocks Details
    </h2>

    <ListGroup v-if="block">
      <!-- height -->
      <ListGroupItem>
        <template #label>Height:</template>
        <template #value>#{{ block.index }}</template>
      </ListGroupItem>

      <!-- timestamp -->
      <ListGroupItem>
        <template #label>Timestamp:</template>
        <template #value>
          <span class="d-none d-lg-inline me-1">
            <Timestamp :value="block.timestamp" ago />,
          </span>
          <Timestamp :value="block.timestamp" />
        </template>
      </ListGroupItem>

      <!-- transactions -->
      <ListGroupItem>
        <template #label>Transactions:</template>
        <template #value>
          <router-link
            class="me-1"
            :to="{ name: 'transactions', query: { block: block.index } }"
          >{{ block.transactions.length }}</router-link>transactions in this block
        </template>
      </ListGroupItem>

      <!-- hash -->
      <ListGroupItem>
        <template #label>Block Hash:</template>
        <template #value>{{ block.hash }}</template>
      </ListGroupItem>

      <!-- parent hash -->
      <ListGroupItem>
        <template #label>Parent Hash:</template>
        <template #value>
          <router-link
            v-if="block.index > 0"
            :to="{ name: 'block', params: { id: block.index - 1 } }"
          >{{ block.parentHash }}</router-link>
          <span v-else>{{ block.parentHash }}</span>
        </template>
      </ListGroupItem>

      <!-- difficulty -->
      <ListGroupItem>
        <template #label>Difficulty:</template>
        <template #value>{{ block.difficulty }}</template>
      </ListGroupItem>

      <!-- nonce -->
      <ListGroupItem>
        <template #label>Nonce:</template>
        <template #value>{{ block.nonce }}</template>
      </ListGroupItem>

      <!-- miner -->
      <ListGroupItem>
        <template #label>Miner address:</template>
        <template #value>{{ block.miner }}</template>
      </ListGroupItem>

      <!-- reward -->
      <ListGroupItem>
        <template #label>Reward:</template>
        <template #value>
          <Currency :value="block.reward" />
        </template>
      </ListGroupItem>
    </ListGroup>
  </section>
</template>
