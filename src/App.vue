<script setup lang="ts">

import Navigation from './components/Navigation.vue';

</script>

<template>
  <Navigation class="fixed-top" />

  <div class="container my-5">
    <router-view></router-view>
  </div>
</template>


<style>
.list-group-item a {
  text-decoration: none;
}
.list-group-item a:hover {
  text-decoration: underline;
}
</style>