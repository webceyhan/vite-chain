<!-- AUTOMATION BADGES -->

[![CodeQL](https://github.com/webceyhan/vite-chain/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/webceyhan/vite-chain/actions/workflows/codeql-analysis.yml)
[![Deploy to Heroku](https://github.com/webceyhan/vite-chain/actions/workflows/heroku.yml/badge.svg)](https://github.com/webceyhan/vite-chain/actions/workflows/heroku.yml)

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

[View Demo](https://webceyhan-vite-chain.herokuapp.com/) |
[Report Issue](https://github.com/webceyhan/vite-chain/issues) |
[Request Feature](https://github.com/webceyhan/vite-chain/pulls) |
[@webceyhan](https://twitter.com/webceyhan)

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

## Deployment (Heroku)

A GitHub Action will automatically deploy the project to Heroku on every push.

> See the details in [.github/workflows/heroku.yml](./.github/workflows/heroku.yml)

1. Create an [Heroku](https://www.heroku.com/home) account.

2. Install the `heroku-cli` as shown in the [guide](https://devcenter.heroku.com/articles/heroku-cli#install-the-heroku-cli).

3. Create a new Heroku app inside the project folder to bind it.

    ```sh
    heroku create
    ```

    > This will create a new application on Heroku server and bind it to your project by adding a remote `heroku` upstream to your git repository.

4. Set the following secrets on your Github repository:
    ```sh
    HEROKU_API_KEY
    HEROKU_APP_NAME
    HEROKU_EMAIL
    ```

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
-   [GitHub Actions](https://docs.github.com/en/actions)
    -   [Heroku](https://www.heroku.com)
    -   [heroku-deploy](https://github.com/akhileshns/heroku-deploy@)
-   [Mastering Bitcoin](https://www.oreilly.com/library/view/mastering-bitcoin/9781491902639/ch01.html)
    -   [Naivecoin](https://github.com/lhartikk/naivecoin)
    -   [Build your own Blockchain in Javascript](https://github.com/nambrot/blockchain-in-js)
    -   [python_blockchain_app](https://github.com/satwikkansal/python_blockchain_app)
