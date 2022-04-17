<script setup lang="ts">
import { PropType } from "vue";
import ListGroup from "./common/ListGroup.vue";
import ListGroupItem from "./common/ListGroupItem.vue";
import Timestamp from "./common/Timestamp.vue";
import Placeholder from "./common/Placeholder.vue";
import Currency from "./common/Currency.vue";
import Icon from "./common/Icon.vue";

defineProps({
  stats: { type: Object as PropType<any>, default: () => {} },
});
</script>

<template>
  <ListGroup class="list-group-horizontal-lg mb-1">
    <ListGroupItem class="flex-fill p-lg-4">
      <div class="col-auto align-self-start">
        <Icon name="difficulty" class="h1" />
      </div>
      <div class="col">
        <small class="text-muted">Current Difficulty</small>
        <Placeholder :value="stats.difficulty">
          <div class="display-6">
            <span class="h1">{{ stats.difficulty }}</span>
          </div>
        </Placeholder>
      </div>
    </ListGroupItem>

    <ListGroupItem class="flex-fill p-lg-4">
      <div class="col-auto align-self-start">
        <Icon name="block" class="h1" />
      </div>
      <div class="col">
        <small class="text-muted">Total Blocks</small>
        <Placeholder :value="stats.totalBlocks">
          <div class="display-6">
            <span class="h1">{{ stats.totalBlocks }}</span>
          </div>
        </Placeholder>
      </div>
    </ListGroupItem>

    <ListGroupItem class="flex-fill p-lg-4">
      <div class="col-auto align-self-start">
        <Icon name="tx" class="h1" />
      </div>
      <div class="col">
        <small class="text-muted">Total Transactions</small>
        <Placeholder :value="stats.totalTransactions">
          <div class="display-6">
            <span class="h1">{{ stats.totalTransactions }}</span>
          </div>
        </Placeholder>
      </div>
    </ListGroupItem>

    <ListGroupItem class="flex-fill p-lg-4">
      <div class="col-auto align-self-start">
        <Icon name="wallet" class="h1" />
      </div>
      <div class="col">
        <small class="text-muted">Total Wallets</small>
        <Placeholder :value="stats.totalWallets">
          <div class="display-6">
            <span class="h1">{{ stats.totalWallets }}</span>
          </div>
        </Placeholder>
      </div>
    </ListGroupItem>
  </ListGroup>

  <ListGroup class="list-group-horizontal-lg bg-primary bg-opacity-25">
    <ListGroupItem class="flex-fill p-lg-4">
      <div class="col-auto align-self-start">
        <Icon name="time" class="h1" />
      </div>
      <div class="col">
        <small class="text-muted">Time of last block</small>
        <Placeholder :value="stats.lastBlockTimestamp">
          <div class="display-7 text-light text-opacity-75">
            <Timestamp :value="stats.lastBlockTimestamp" />
          </div>
        </Placeholder>
      </div>
    </ListGroupItem>

    <ListGroupItem class="flex-fill p-lg-4">
      <div class="col-auto align-self-start">
        <Icon name="coin" class="h1" />
      </div>
      <div class="col">
        <small class="text-muted">Total Supply</small>
        <Placeholder :value="stats.totalSupply">
          <div class="display-7 text-light text-opacity-75">
            <Currency :value="stats.totalSupply" />
          </div>
        </Placeholder>
      </div>
    </ListGroupItem>

    <ListGroupItem class="flex-fill p-lg-4">
      <div class="col-auto align-self-start">
        <Icon name="coin" class="h1" />
      </div>
      <div class="col">
        <small class="text-muted">Max Supply</small>
        <Placeholder :value="stats.maxSupply">
          <div class="display-7 text-light text-opacity-75">
            <Currency :value="stats.maxSupply" />
          </div>
        </Placeholder>
      </div>
    </ListGroupItem>
  </ListGroup>
</template>

<style>
.display-7 {
  font-size: calc(1rem + 1vw);
}
</style>
