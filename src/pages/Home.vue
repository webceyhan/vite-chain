<script setup lang="ts">

import { useTickers } from '../store/tickers';
import { onMounted, onUnmounted } from 'vue';
import ChainStats from '../components/ChainStats.vue';

const { connect, disconnect, chain } = useTickers();

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
      <div class="col-12 col-lg-5">blocks</div>

      <!-- transactions -->
      <div class="col-12 col-lg-7">transactions</div>
    </div>
  </section>
</template>
