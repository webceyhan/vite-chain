<script setup lang="ts">
import { useTickers } from "../store/tickers";
import { onMounted, onUnmounted } from "vue";
import ChainStats from "../components/ChainStats.vue";
import BlockList from "../components/BlockList.vue";
import TransactionList from "../components/TransactionList.vue";

const { connect, disconnect, chain, latestBlocks, latestTransactions } = useTickers();

onMounted(() => connect());
onUnmounted(() => disconnect());
</script>

<template>
  <section>
    <div class="row g-5">
      <!-- stats -->
      <div class="col-12">
        <ChainStats :stats="chain" />
      </div>

      <!-- blocks -->
      <div class="col-12 col-lg-5">
        <BlockList :blocks="latestBlocks" />
      </div>

      <!-- transactions -->
      <div class="col-12 col-lg-7">
        <TransactionList :transactions="latestTransactions" pending />
      </div>
    </div>
  </section>
</template>
