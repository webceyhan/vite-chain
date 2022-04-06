<script setup lang="ts">

import { watch } from 'vue';
import { useRoute } from 'vue-router'
import { useWallets } from '../store/wallets';
import ListGroup from '../components/common/ListGroup.vue';
import ListGroupItem from '../components/common/ListGroupItem.vue';
import TransactionList from '../components/TransactionList.vue';
import Currency from '../components/common/Currency.vue';
import Icon from '../components/common/Icon.vue';
import Clipboard from '../components/common/Clipboard.vue';

const route = useRoute();
const { wallet, loadOne } = useWallets();

loadOne(route.params.address);

watch(() => route.params.address, (address) => address && loadOne(address));

</script>

<template>
  <section>
    <h2>
      <Icon name="wallet" class="me-2" />Wallet Details
    </h2>

    <p v-if="!wallet">not found</p>

    <div class="row g-5" v-else>
      <div class="col-12 col-lg-7">
        <ListGroup>
          <!-- address -->
          <ListGroupItem>
            <template #label>Address:</template>
            <template #value>{{ wallet.address }}</template>
            <template #end>
              <Clipboard :value="wallet.address" />
            </template>
          </ListGroupItem>

          <!-- transaction count -->
          <ListGroupItem>
            <template #label>Transactions:</template>
            <template #value>
              <a href="#">{{ wallet.transactions.length }}</a> transactions of this wallet.
            </template>
          </ListGroupItem>

          <!-- balance -->
          <ListGroupItem>
            <template #label>Balance:</template>
            <template #value>
              <Currency :value="wallet.balance" />
            </template>
          </ListGroupItem>
        </ListGroup>
      </div>

      <div class="col col-lg-5">
        <TransactionList :transactions="wallet.transactions" />
      </div>
    </div>
  </section>
</template>
