<script setup lang="ts">
import Icon from "./common/Icon.vue";

const links = [
  {
    name: "Blocks",
    path: "/blocks",
    icon: "block",
  },
  {
    name: "Transactions",
    path: "/transactions",
    icon: "tx",
  },
  {
    name: "Wallets",
    path: "/wallets",
    icon: "wallet",
  },
];
</script>

<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <div class="container">
      <!-- brand link -->
      <router-link class="navbar-brand" to="/">ViteChain</router-link>

      <!-- toggle button -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- collapsible content -->
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-md-auto">
          <li class="nav-item d-flex" v-for="(link, i) in links" :key="i">
            <span class="vr mx-2"></span>
            <router-link class="nav-link" :to="link.path">
              <Icon :name="link.icon" class="me-1" />
              {{ link.name }}
            </router-link>
          </li>
        </ul>

        <!-- my wallet -->
        <ul class="navbar-nav">
          <li class="nav-item d-flex">
            <span class="d-md-none vr mx-2"></span>
            <router-link class="nav-link" to="/my-wallet">
              <Icon name="wallet" class="me-1" />
              My Wallet
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar-dark {
  background-color: #223b63 !important;
}
</style>
