export class Transaction {
    constructor(
        public from: string,
        public to: string,
        public amount: number,
        public timestamp: number = Date.now(),
        public hash: string = ''
    ) {}
}
