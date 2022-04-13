// BLOCKCHAIN //////////////////////////////////////////////////////////////////////////////////////

/**
 * Version code for the blockchain network.
 *
 * - Mainnet: 0x80
 * - Testnet: 0xef
 */
export const VERSION = 0x80;

/**
 * Crypto currency coin symbol.
 */
export const COIN_SYMBOL = 'VTC';

/**
 * Address of the coinbase transaction.
 */
export const ROOT_ADDRESS = 'root';

/**
 * Difficulty level for proof-of-work mechanism
 */
export const BLOCK_DIFFICULTY = 1;

/**
 * Time in seconds for a block to be mined.
 *
 * For example, if BLOCK_TIME_INTERVAL is 60,
 * then a block will be mined every 60 seconds (1 minute).
 */
export const BLOCK_TIME_INTERVAL = 60;

/**
 * Initial mining reward per block.
 *
 * Original block reward for miners was 50 BTC.
 *
 * Every N blocks defined by BLOCK_REWARD_INTERVAL,
 * the reward is divided by 2 which called halving.
 */
export const BLOCK_REWARD = 50;

/**
 * Number of blocks for halving the reward.
 *
 * In Bitcoin, original block reward interval was 210000
 * around every 4 years with a 10 minute block interval
 */
export const BLOCK_REWARD_INTERVAL = 100;

// NETWORK /////////////////////////////////////////////////////////////////////////////////////////

/**
 * Network port for API server.
 */
export const PORT = (process.env.PORT as any) || 8080;

/**
 * Default hostname for all network requests.
 */
export const HOSTNAME = process.env.HOSTNAME || '0.0.0.0';
