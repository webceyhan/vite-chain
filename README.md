<!-- AUTOMATION BADGES -->

[![CodeQL](https://github.com/webceyhan/vite-chain/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/webceyhan/vite-chain/actions/workflows/github-code-scanning/codeql)

<!-- LOGO (OPTIONAL) -->

<!-- <img src="./src/assets/logo.png" width="100px"> -->

 <!-- HEADER ///////////////////////////////////////////////////////////// -->

# ViteChain - Blockchain Application

This is a tiny blockchain application that demonstrates the core concepts of blockchain technology.

It consists of a backend node and a frontend application.

Backend node is a node that runs on a server and is responsible for storing and retrieving data from the blockchain.
Core functionality is to create a new block (mining), add data to the block (transactions), and add the block to the blockchain.
Each node can interact with other nodes using the P2P protocol to provide a distributed system and keep in sync with each other.

Backend server is built on ExpressJs and responsible for serving the compiled frontend app as static content,
providing rest API and SSE events to the frontend, and listening to P2P connections using Websockets for real-time communication.

Frontend application is used to interact with the backend node and to visualize the blockchain. It works in the same way
as Etherscan website does to display the blockchain information and transactions. App is built with Vite + Vue + Bootstrap.
Client can fetch real-time blockchain data using SSE (Server-Sent Events) to show on the dashboard.

<br>
<!-- BLOCKCHAIN /////////////////////////////////////////////////////// -->

## Blockchain Concepts and Architecture

-   Core architecture:
    -   **Chain**: Collection of blocks.
    -   **Block**: A piece of data that is stored in the blockchain.
    -   **Transaction**: A record to transfer funds from one account to another.
    -   **CoinPool**: A pool that keeps track of the total amount of coins associated with each account in the blockchain.
-   Network:
    -   **P2P**: A network of computers (peers) that can communicate with each other without a central server.
    -   **Rest API**: A way to access blockchain data from public (wallets, dapps, blockchain explorers, etc.)
        -   **Explorer**: A way to visualize the blockchain on the web.
        -   **Wallet**: A digital wallet that stores and manages your funds.

### Chain

Chain is a collection of blocks that are linked together.

It keeps track of the history of transactions, current state of the CoinPool (amount of coins in circulation), and the current state of the blockchain.

It contains the logic to create a new block, process transactions of the block, update / replace the state of the blockchain, calculate the current block difficulty and max supply of coins.

For the simplicity of the demo, i don't use UTXO (Unspent Transaction Output) model.
Instead, CoinPool is used to keep track of the amount of coins in circulation.

### Block

A block is a piece of data that is stored in the blockchain in a chainable way.
It contains the index number, the hash of the previous block, the hash of the block itself, a list of transactions, difficulty, nonce, and a timestamp.

Every block is linked to the previous block by the hash of the previous block.
Block index is a sequential number that starts from 0 (the genesis block).

### Transaction

In ViteChain, there are 2 type of transactions:

1. Transfer transaction:
   When a user transfers funds to another user, a transfer transaction is created.
   Sender has to sign the transaction and send it to the blockchain.
   After transaction is verified using signature and public key of the sender,
   it will be added to the blockchain (confirmed).

2. Coinbase transaction:
   When a new block is created, a coinbase transaction is created by the node that mines the block. It is a special transaction that is used to reward miners.
   The amount is a sum of transaction fees and mining reward of that block.

### Wallet

A wallet is a set of private and public keys that are used to sign transactions.
It also contains the address of the wallet which is derived from the public key using base58Check encoding and prefixed with 'vt' (referred to the first 2 characters of VTC ViteChain Coin).

You can create a new wallet with random keys or import a wallet from a private key in different formats such as WiF, mnemonic, raw private key, etc.

In this demo, we use raw private key or WiF (Wallet Import Format) to export / import a wallet.

### Node

Node is a computer that runs on a server and is responsible for storing and retrieving data from the blockchain.

It tries to keep the blockchain in sync with other nodes, while trying to mine new blocks and reward the miner that runs the node.

During the mining process, the node will try to find a valid block that satisfies the difficulty requirement using the proof of work algorithm. If a valid block is found, it will be added to the blockchain with pending transactions.

<br>
<!-- REQUIREMENTS /////////////////////////////////////////////////////// -->

## Requirements

You need to install the [Node.js](https://nodejs.dev/)
and `npm` package manager first.

> Recommended IDE:
> [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

<br>
<!-- INSTALLATION //////////////////////////////////////////////////////// -->

## Installation

1. Clone the repository.
    ```sh
    git clone https://github.com/webceyhan/vite-chain.git
    ```
2. Get inside the cloned project folder.
    ```sh
    cd vite-chain
    ```
3. Install NPM packages.
    ```sh
    npm install
    ```

<br>
<!-- USAGE /////////////////////////////////////////////////////////////// -->

## Usage

You can use following commands to do various task with the project.

```sh
npm start               # run application
npm run dev             # start watching backend & frontend concurrently
npm run dev2            # start 2nd instance of the application to simulate P2P network
npm run dev:backend     # start nodemon to watch blockchain node
npm run dev:frontend    # start vite to watch frontend app
npm run build           # build for production
npm run preview         # preview built app
npm run test            # run unit tests
npm run test:watch      # run unit tests in watch mode
```

> Take a look at the other scripts in [`package.json`](./package.json)

<br>
<!-- DEVELOPMENT ///////////////////////////////////////////////////////// -->

## Development

You have to run both backend server and frontend development server concurrently to be able to develop application properly.

```sh
npm run dev
```

To simulate P2P network, you can run 2nd instance of the application.

```sh
npm run dev2
```

<br>
<!-- BUILDING //////////////////////////////////////////////////////////// -->

## Building

Build the frontend application for production.

```sh
npm run build
```

To preview, you still have to run the backend server which will serve the app and provide socket connectivity in order to make it work properly.

```sh
npm run preview
```

<br>
<!-- DEPLOYMENT ////////////////////////////////////////////////////////// -->

## Deployment (Render)

Project is linked to [Render](https://render.com/) for deployment.

> It will automatically deploy the project to Render on every push.

<br>
<!-- REFERENCES ////////////////////////////////////////////////////////// -->

## References

-   [Node.js](https://nodejs.dev/)
-   [Vite](https://vitejs.dev/)
-   [Vue.js](https://vuejs.org/)
-   [Bootstrap](https://getbootstrap.com)
-   [Express.js](https://expressjs.com/)
-   [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)
-   [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
-   [WebSocket (WS)](https://github.com/websockets/ws)
-   [Mastering Bitcoin](https://www.oreilly.com/library/view/mastering-bitcoin/9781491902639/ch01.html)
    -   [Naivecoin](https://github.com/lhartikk/naivecoin)
    -   [SavjeeCoin](https://github.com/Savjee/SavjeeCoin)
    -   [Build your own Blockchain in Javascript](https://github.com/nambrot/blockchain-in-js)
    -   [python_blockchain_app](https://github.com/satwikkansal/python_blockchain_app)
