import { Transaction } from './transaction';

/**
 * Coin (UTXO - Unspent Transaction Output)
 *
 * In cryptocurrencies such as Bitcoin, an unspent transaction output (UTXO) is an abstraction of electronic money.
 * Each UTXO is analogous to a coin, and holds a certain amount of value in its respective currency.
 * Each UTXO represents a chain of ownership implemented as a chain of digital signatures where the owner
 * signs a message (transaction) transferring ownership of their UTXO to the receiver's public key.
 *
 * A UTXO defines an output of a blockchain transaction that has not been spent, i.e. can be used
 * as an input in a new transaction. Bitcoin is an example of a cryptocurrency that uses the UTXO model.
 *
 * The UTXO model is a design common to many cryptocurrencies, most notably Bitcoin.
 * Cryptocurrencies which use the UTXO model do not use accounts or balances.
 * Instead, individual coins (UTXOs) are transferred between users much like physical coins or cash.
 */
export type Coin = { key: string; amount: number };

/**
 * Coin Pool (UTXO Set)
 *
 * The total UTXOs present in a blockchain represents a set, every transaction consumes elements
 * from this set and creates new ones that are added to the set. Thus, the set represents all
 * of the coins in a particular cryptocurrency system. The complete UTXO set can be summed
 * to calculate the total supply of a cryptocurrency at a given point in time.
 *
 * Outputs are a superset of UTXOs. Accordingly, UTXOs are a subset of the outputs superset.
 * Bitcoin UTXO lifespans have been studied. In the case of a valid blockchain transaction,
 * unspent outputs (and only unspent outputs) may be used to fund further transactions.
 * The requirement that only unspent outputs may be used in further transactions
 * is necessary to prevent double-spending and fraud.
 *
 * For this reason, inputs on a blockchain are removed from the UTXO set when a transaction occurs,
 * whilst at the same time, outputs create new UTXOs, which are added to the UTXO set.
 * These unspent transaction outputs may be used (by the holders of private keys;
 * for example, persons with cryptocurrency wallets) for the purpose of future transactions.
 */
export class CoinPool {
    /**
     * Address-Coin map
     */
    private readonly pool: Map<string, Coin>;

    constructor(coins: Coin[] = []) {
        // initialize coin pool with provided coins
        this.pool = new Map(coins.map((coin) => [coin.key, coin]));
    }

    /**
     * Size of the pool.
     */
    get size(): number {
        return this.pool.size;
    }

    /**
     * An array of coin keys.
     */
    get keys(): string[] {
        return Array.from(this.pool.keys());
    }

    /**
     * An array of coins objects.
     */
    get coins(): Coin[] {
        return Array.from(this.pool.values());
    }

    /**
     * Total amount of coins.
     */
    get total(): number {
        return this.coins.reduce((acc, { amount }) => acc + amount, 0);
    }

    /**
     * Get coin balance of a key or 0 if not found.
     */
    getBalance(key: string): number {
        return this.pool.get(key)?.amount || 0;
    }

    /**
     * Set coin balance of a key.
     *
     * If the key does not exist, it will be created,
     * otherwise existing the balance will be updated.
     * Negative or zero balance will be removed.
     */
    setBalance(key: string, amount: number): void | never {
        // sum existing balance with new amount
        const balance = this.getBalance(key) + amount;

        // fail if insufficient funds
        if (balance < 0) {
            throw new Error('Insufficient funds');
        }

        // remove coin if balance is zero
        if (balance === 0) {
            return this.pool.delete(key) as any;
        }

        // update coin amount in the pool
        this.pool.set(key, { key, amount: balance });
    }

    /**
     * Transfer coins from one to another.
     */
    transact(tx: Transaction): void | never {
        // check if transaction is not coinbase
        if (!tx.isCoinbase) {
            // remove (credit) coins from sender balance
            this.setBalance(tx.from, -(tx.amount + tx.fee));
        }

        // add (debit) coins to receiver
        this.setBalance(tx.to, tx.amount);
    }

    /**
     * Clone the coin pool.
     */
    clone(): CoinPool {
        // export all coins from pool as plain objects
        // to prevent passing objects by reference
        return new CoinPool(this.coins.map((coin) => ({ ...coin })));
    }
}
