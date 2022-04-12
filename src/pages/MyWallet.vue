<script setup lang="ts">

import { BrowserWallet } from '../BrowserWallet'
import { computed, ref } from 'vue';
import { useWallets } from '../store/wallets';
import ListGroup from '../components/common/ListGroup.vue';
import ListGroupItem from '../components/common/ListGroupItem.vue';
import TransactionList from '../components/TransactionList.vue';
import Currency from '../components/common/Currency.vue';
import Icon from '../components/common/Icon.vue';

const { wallet, loadOne, transfer } = useWallets();

// demo wallet private key
const demoKey = '633d6bee776c7b54359bf56c5c0767f859c49345f9dac5aef5fd8d1d1a0bb616';

// define key-pair and address
let walletObj: BrowserWallet;

// define key form (defaults to local storage)
const keyForm = ref(localStorage.getItem('key') ?? demoKey);

// define tx form
const txForm = ref({ to: '', amount: 0 })

const canTransfer = computed(() =>
  (txForm.value.to != '' && txForm.value.amount > 0));

function onLogin() {
  // initialize wallet object
  walletObj = BrowserWallet.fromKey(keyForm.value);

  // load wallet data from backend
  // loadOne(walletObj.address);

  // store private key in local storage
  localStorage.setItem('key', keyForm.value);
}

function onTransfer() {
  // extract tx form data
  const { to, amount } = txForm.value;

  // create and transfer signed tx object
  // transfer({ ...walletObj.transact(to, amount) });
}

</script>

<template>
  <section>
    <h2 class="mb-4">
      <Icon name="wallet" class="me-2" />My Wallet
    </h2>

    <!-- login form -->
    <div class="row" v-if="!wallet">
      <form @submit.prevent="onLogin">
        <div class="mb-3">
          <label for="privateKey" class="form-label">Private Key</label>
          <input id="privateKey" class="form-control" v-model="keyForm" required />
        </div>
        <button type="submit" class="btn btn-primary" :disabled="!keyForm">Log In</button>
      </form>
    </div>

    <div class="row g-5" v-else>
      <div class="col-12 col-lg-7">
        <ListGroup>
          <!-- address -->
          <ListGroupItem>
            <template #label>Address:</template>
            <template #value>{{ wallet.address }}</template>
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

        <br />
        <!-- transfer form -->
        <div class="card bg-dark">
          <div class="card-header">
            <h5>Transfer</h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="onTransfer">
              <div class="mb-3">
                <label for="to" class="form-label">To</label>
                <textarea id="to" class="form-control" v-model="txForm.to" rows="3" required></textarea>
              </div>
              <div class="mb-3">
                <label for="amount" class="form-label">Amount</label>

                <div class="input-group">
                  <input
                    id="amount"
                    type="number"
                    min="0"
                    :max="wallet.balance"
                    class="form-control"
                    v-model.number="txForm.amount"
                    required
                  />
                  <div class="input-group-text">
                    <small>VT</small>
                  </div>
                  <div class="input-group-text">
                    <button
                      class="btn btn-link"
                      type="button"
                      @click="txForm.amount = wallet?.balance || 0"
                    >max</button>
                  </div>
                </div>
              </div>
              <button type="submit" class="btn btn-success" :disabled="!canTransfer">Transfer</button>
            </form>
          </div>
        </div>
      </div>

      <div class="col col-lg-5">
        <TransactionList :transactions="wallet.transactions" />
      </div>
    </div>
  </section>
</template>
