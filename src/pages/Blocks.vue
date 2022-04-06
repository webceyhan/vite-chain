<script setup lang="ts">

import { watch } from 'vue';
import { useRoute } from 'vue-router'
import { useBlocks } from '../store/blocks';
import Currency from '../components/common/Currency.vue';
import Timestamp from '../components/common/Timestamp.vue';
import ListGroup from '../components/common/ListGroup.vue';
import ListGroupItem from '../components/common/ListGroupItem.vue';
import Icon from '../components/common/Icon.vue';

const { blocks, load } = useBlocks();

const route = useRoute();

watch(route, () => {
  if (route.name != 'blocks') return;
  load(route.query)
});

load(route.query);

</script>

<template>
  <section>
    <h2>
      <Icon name="block" class="me-2" />Blocks
    </h2>

    <!-- header -->
    <div class="d-none d-lg-flex row p-3">
      <div class="col-2">Height</div>
      <div class="col-4">Hash</div>
      <div class="col-2">Time</div>
      <div class="col-2">Age</div>
      <div class="col">Txns</div>
      <div class="col text-end">Reward</div>
    </div>

    <ListGroup flush>
      <ListGroupItem class="mb-2 mb-lg-0" v-for="(block, i) in blocks" :key="i" hover>
        <!-- height -->
        <div class="col-6 col-lg-2">
          <router-link :to="{ name: 'block', params: { id: block.height } }">#{{ block.height }}</router-link>
        </div>

        <!-- date -->
        <div class="col-6 col-lg-2 text-end text-lg-start order-lg-1">
          <Timestamp :value="block.timestamp" />
        </div>

        <!-- age: lg only -->
        <div class="d-none d-lg-flex col-lg-2 order-lg-2">
          <Timestamp :value="block.timestamp" ago />
        </div>

        <!-- divider: no lg -->
        <div class="d-lg-none col-12">
          <hr class="bg-secondary bg-opacity-50 my-2" />
        </div>

        <!-- hash -->
        <div class="col-12 col-lg-4 text-truncate mb-1 mb-lg-0 order-lg-0">
          <span class="d-lg-none text-muted me-1">Hash:</span>
          <span>{{ block.hash }}</span>
        </div>

        <!-- transactions -->
        <div class="col order-lg-3">
          <span class="d-lg-none text-muted me-1">Transactions:</span>
          <router-link
            :to="{ name: 'transactions', query: { block: block.height } }"
          >{{ block.transactions.length }}</router-link>
        </div>

        <!-- reward -->
        <div class="col text-end text-muted order-lg-4">
          <span class="d-lg-none me-1">Reward:</span>
          <Currency :value="block.reward" />
        </div>
      </ListGroupItem>
    </ListGroup>
  </section>
</template>
