import { Commitment } from "@solana/web3.js";
import { logger, retrieveEnvVariable } from "../utils";

export const PRIVATE_KEY = retrieveEnvVariable('PRIVATE_KEY', logger);
export const RPC_ENDPOINT = retrieveEnvVariable('RPC_ENDPOINT', logger);
export const RPC_WEBSOCKET_ENDPOINT = retrieveEnvVariable('RPC_WEBSOCKET_ENDPOINT', logger);
export const NETWORK = 'mainnet-beta';
export const COMMITMENT_LEVEL: Commitment = retrieveEnvVariable('COMMITMENT_LEVEL', logger) as Commitment;
export const LOG_LEVEL = retrieveEnvVariable('LOG_LEVEL', logger);
export const QUOTE_MINT = retrieveEnvVariable('QUOTE_MINT', logger);
export const MAIN_MINT = retrieveEnvVariable('MAIN_MINT', logger);
export const IS_JITO = retrieveEnvVariable('IS_JITO', logger);
export const LIMIT_SOL_PRICE = Number(retrieveEnvVariable('LIMIT_SOL_PRICE', logger));
export const MIN_SOL_BALANCE = Number(retrieveEnvVariable('MIN_SOL_BALANCE', logger));
export const FETCH_SOL_PRICE_TIME = Number(retrieveEnvVariable('FETCH_SOL_PRICE_TIME', logger));

