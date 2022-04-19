import { deserializeTransaction } from '../backend/serialization';
import { WebWallet } from '../src/WebWallet';
import { Wallet } from '../backend/wallet';
import sampleTx from './mock/transaction';
import sample from './mock/wallet';

describe('WebWallet', () => {
    it('should create a wallet', () => {
        const wallet = new WebWallet();

        expect(wallet.address).toBeDefined();
        expect(wallet.address.length).toBe(sample.address.length);
    });

    it('should load a wallet from a private key', () => {
        const wallet = WebWallet.fromKey(sample.privateKey);

        expect(wallet.address).toBe(sample.address);
    });

    it("should sign a data with the wallet's private key", () => {
        const wallet = WebWallet.fromKey(sample.privateKey);
        const signature = wallet.sign(sample.data);

        expect(signature).toBe(sample.signature);
    });

    it('should verify a signature with an address', () => {
        const { from, to, signature, amount, timestamp, hash } = sampleTx;
        const verification = Wallet.verify(hash, signature, from);

        expect(verification).toBe(true);
    });

    it('should have same address as wallet', () => {
        const wallet = Wallet.fromKey(sampleTx.privateKey);
        const webWallet = WebWallet.fromKey(sampleTx.privateKey);

        expect(wallet.address).toBe(webWallet.address);
    });

    it('should have equal tx signature to wallet', () => {
        const tx = deserializeTransaction(sampleTx as any);
        const webWallet = WebWallet.fromKey(sampleTx.privateKey);
        const wallet = Wallet.fromKey(sampleTx.privateKey);

        const walletSignature = wallet.sign(tx.hash);
        const webWalletSignature = webWallet.sign(tx.hash);

        expect(tx.hash).toBe(sampleTx.hash);
        expect(walletSignature).toBe(webWalletSignature);

        expect(walletSignature).toBe(sampleTx.signature);
        expect(webWalletSignature).toBe(sampleTx.signature);
    });
});
