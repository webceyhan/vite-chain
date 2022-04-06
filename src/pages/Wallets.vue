<script setup lang="ts">

import { useWallets } from '../store/wallets';
import Currency from '../components/common/Currency.vue';
import ListGroup from '../components/common/ListGroup.vue';
import ListGroupItem from '../components/common/ListGroupItem.vue';
import Icon from '../components/common/Icon.vue';
import { useRoute } from 'vue-router';
import { watch } from 'vue';

const { wallets, load } = useWallets();
const route = useRoute();

watch(route, () => {
  if (route.name != 'wallets') return;
  load(route.query)
});

load(route.query);

</script>

<template>
  <section>
    <h2>
      <Icon name="wallet" class="me-2" />Wallets
    </h2>

    <!-- header -->
    <div class="d-none d-lg-flex row p-3">
      <div class="col-6">Address</div>
      <div class="col text-end">Balance</div>
    </div>

    <ListGroup flush>
      <ListGroupItem class="mb-2 mb-lg-0" v-for="(wallet, i) in wallets" :key="i" hover>
        <!-- address -->
        <div class="col-8 col-lg-6 text-truncate mb-1 mb-lg-0">
          <router-link
            :to="{ name: 'wallet', params: { address: wallet.address } }"
          >{{ wallet.address }}</router-link>
        </div>

        <!-- balance -->
        <div class="col text-end">
          <span class="d-lg-none text-muted me-1">Balance:</span>
          <Currency :value="wallet.balance" />
        </div>
      </ListGroupItem>
    </ListGroup>
  </section>
</template>
