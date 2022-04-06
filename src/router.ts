import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/blocks/:id',
        name: 'block',
        component: () => import('./pages/BlockDetails.vue'),
    },
    {
        path: '/blocks',
        name: 'blocks',
        component: () => import('./pages/Blocks.vue'),
    },
    {
        path: '/transactions/:hash',
        name: 'transaction',
        component: () => import('./pages/TransactionDetails.vue'),
    },
    {
        path: '/transactions',
        name: 'transactions',
        component: () => import('./pages/Transactions.vue'),
    },
    {
        path: '/wallets/:address',
        name: 'wallet',
        component: () => import('./pages/WalletDetails.vue'),
    },
    {
        path: '/wallets',
        name: 'wallets',
        component: () => import('./pages/Wallets.vue'),
    },
    {
        path: '/my-wallet',
        name: 'my-wallet',
        component: () => import('./pages/MyWallet.vue'),
    },
];

export const router = createRouter({
    history: createWebHistory(),
    linkExactActiveClass: 'active',
    linkActiveClass: 'active',
    routes,
});
