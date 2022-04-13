import { Wallet } from '../backend/wallet';
import { readFileSync } from 'fs';

import sample from './mock/wallet';

describe('Wallet', () => {
    it('should create a wallet', () => {
        const wallet = new Wallet();

        expect(wallet.privateKey).toBeDefined();
        expect(wallet.privateKey.length).toBe(sample.privateKey.length);

        expect(wallet.publicKey).toBeDefined();
        expect(wallet.publicKey.length).toBe(sample.publicKey.length);

        expect(wallet.address).toBeDefined();
        expect(wallet.address.length).toBe(sample.address.length);

        expect(wallet.WiF).toBeDefined();
        expect(wallet.WiF.length).toBe(sample.wif.length);
    });

    it('should load a wallet from a private key', () => {
        const wallet = Wallet.fromKey(sample.privateKey);

        expect(wallet.privateKey).toBe(sample.privateKey);
    });

    it('should load a wallet from a WiF', () => {
        const wallet = Wallet.fromWiF(sample.wif);

        expect(wallet.privateKey).toBe(sample.privateKey);
    });

    it('should export a wallet to a WiF file', () => {
        Wallet.fromKey(sample.privateKey).export();
        const exportedKey = readFileSync(Wallet.PATH).toString();

        expect(exportedKey).toBe(sample.wif);
    });

    it('should import a wallet from a WiF file', () => {
        const wallet = Wallet.import();

        expect(wallet.privateKey).toBe(sample.privateKey);
    });

    it("should sign a data with the wallet's private key", () => {
        const wallet = Wallet.fromKey(sample.privateKey);
        const signature = wallet.sign(sample.data);

        expect(signature).toBe(sample.signature);
    });

    it('should verify a signature with a public key', () => {
        const { data, signature, publicKey } = sample;
        const verification = Wallet.verify(data, signature, publicKey);

        expect(verification).toBe(true);
    });

    it('should verify a signature with an address', () => {
        const { data, signature, address } = sample;
        const verification = Wallet.verify(data, signature, address);

        expect(verification).toBe(true);
    });

    it('should create a transaction signed by a wallet', () => {
        const wallet = Wallet.fromKey(sample.privateKey);
        const transaction = wallet.transact('0x123', 100);

        expect(transaction.from).toBe(wallet.address);
        expect(transaction.to).toBe('0x123');
        expect(transaction.amount).toBe(100);
        expect(transaction.signature).toBeDefined();
    });
});
