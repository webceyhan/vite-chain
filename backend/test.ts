import { chain, miner, logger } from './main';
import { delay, random } from './utils';
import { Wallet } from './core';

// fake user wallet pool
const wallets: Wallet[] = [];

// populate fake user wallets
const populateWallets = async (count = 5) => {
    for (let i = 0; i < count; i++) {
        // add new wallet to pool
        wallets.push(new Wallet());
    }

    console.log(`Total ${wallets.length} wallets created.\n`);
};

// get a random wallet
const randomWallet = () => wallets[random(wallets.length)];

// create a random transaction
const randomTransaction = () => {
    const amount = random(10, 1);
    const recipient = randomWallet();

    // send random amount from miner wallet
    return miner.transact(recipient.address, amount);
};

const createFaker = async () => {
    await populateWallets();

    while (true) {
        try {
            // create random transaction
            const tx = randomTransaction();

            // add transaction to chain
            chain.addTransaction(tx);
        } catch (error) {
            // ignore discarding errors
        }

        // wait for a while
        await delay(random(5));
    }
};

createFaker();
