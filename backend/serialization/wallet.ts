import { TransactionJSON } from './transaction';

export type WalletJSON = {
    address: string;
    balance: number;
    transactions: TransactionJSON[];
};
