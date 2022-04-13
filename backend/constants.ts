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

// NETWORK /////////////////////////////////////////////////////////////////////////////////////////

/**
 * Network port for API server.
 */
export const PORT = (process.env.PORT as any) || 8080;

/**
 * Default hostname for all network requests.
 */
export const HOSTNAME = process.env.HOSTNAME || '0.0.0.0';
