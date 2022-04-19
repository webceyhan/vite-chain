import { Node } from './node';
import { delay, random } from './utils';
import { Wallet } from './wallet';

// DEMO WALLET
// private  : 633d6bee776c7b54359bf56c5c0767f859c49345f9dac5aef5fd8d1d1a0bb616
// public   : 02f3566c7ba66b952035fc91f853eaabaee95afede0a15993e28482a64efb45ef3
// address  : 6jf5w4zadRti1C3NVqvHoYrZwjA9bTGyunxrzHsXkEJyyczfxb
const demoWallet = Wallet.fromKey(
    '633d6bee776c7b54359bf56c5c0767f859c49345f9dac5aef5fd8d1d1a0bb616'
);

// fake user wallet pool
const wallets: Wallet[] = [];

// populate fake user wallets
const populateWallets = async (count = 5) => {
    for (let i = 0; i < count; i++) {
        // add new wallet to pool
        wallets.push(new Wallet());
    }

    // add demo wallet to pool
    wallets.push(demoWallet);
};

// get a random wallet
const randomWallet = () => wallets[random(wallets.length)];

// create a random transaction
const randomTransaction = (miner: Wallet) => {
    const amount = random(10, 1);
    const recipient = randomWallet();

    // send random amount from miner wallet
    return miner.transact(recipient.address, amount);
};

export const useFaker = async (node: Node) => {
    // populate fake wallets
    await populateWallets();

    while (true) {
        try {
            // create random transaction
            const tx = randomTransaction(node.miner);

            // add transaction to chain
            node.addTransaction({ ...tx } as any);
        } catch (error) {
            // ignore discarding errors
        }

        // wait for 10 to 20 seconds
        await delay(random(20, 10));
    }
};
