import { Keypair, PublicKey } from "@solana/web3.js";
import { getTokenBalance, getSOLPrice, getBuyTxWithJupiter, getSellTxWithJupiter, getSolBalance } from "./src/utils";
import { executeJitoTx } from "./src/utils/jito"
import base58 from "bs58";
import dotenv from 'dotenv';
dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY!;
const QUOTE_MINT = process.env.QUOTE_MINT!;
const MAIN_MINT = process.env.MAIN_MINT!;
const IS_JITO = process.env.IS_JITO!;
const LIMIT_SOL_PRICE = Number(process.env.LIMIT_SOL_PRICE!);
const MIN_SOL_BALANCE = Number(process.env.MIN_SOL_BALANCE!);
const FETCH_SOL_PRICE_TIME = Number(process.env.FETCH_SOL_PRICE_TIME!);
const UPLIMITPRICE = Number(process.env.UPLIMITPRICE!);
const DOWNLIMITPRICE = Number(process.env.DOWNLIMITPRICE!);
const tokenLamport = 10 ** 6;



const wallet = Keypair.fromSecretKey(base58.decode(PRIVATE_KEY));

async function main() {

    let swapPrice = await getSOLPrice();
    let lastPrice = await getSOLPrice();

    while (true) {
        try {
            console.log("Fetching SOL price...");
            let currentPrice = await getSOLPrice();
            console.log("Swap SOL Price: ", swapPrice, '\n');
            console.log("Last SOL Price: ", lastPrice, '\n');
            console.log("Current SOL Price: ", currentPrice, '\n');

            let solBalance = await getSolBalance();
            let usdcBalance = await getTokenBalance();
            console.log("SOL Balance: ", solBalance);
            console.log("USDC Balance: ", usdcBalance);

            if ((swapPrice - currentPrice) > DOWNLIMITPRICE || lastPrice < currentPrice) {
                console.log("SOL price is high, swapping USDC to SOL...");
                if (usdcBalance > 0.1) {
                    let swapTx = await getSellTxWithJupiter(wallet, new PublicKey(QUOTE_MINT), (Math.floor((usdcBalance - 0.1) * tokenLamport)));
                    if (swapTx !== null) {
                        let txSig = await executeJitoTx([swapTx], wallet, "confirmed");
                        swapPrice = currentPrice;
                        console.log("Swapped USDC to SOL: ", txSig);
                    } else {
                        console.error("Error: swapTx is null");
                    }
                }
            } else if ((currentPrice - swapPrice) > UPLIMITPRICE || lastPrice > currentPrice) {
                console.log("SOL price is low, swapping SOL to USDC...");
                let solToSwap = solBalance - MIN_SOL_BALANCE;
                if (solToSwap > 0) {

                    console.log(Math.floor(solToSwap * tokenLamport * currentPrice));
                    let swapTx = await getBuyTxWithJupiter(wallet, new PublicKey(QUOTE_MINT), (Math.floor(solToSwap * tokenLamport * currentPrice)));
                    if (swapTx !== null) {
                        let txSig = await executeJitoTx([swapTx], wallet, "confirmed");
                        swapPrice = currentPrice;
                        console.log("Swapped SOL to USDC: ", txSig);
                    } else {
                        console.error("Error: swapTx is null");
                    }
                } else {
                    console.log("Not enough SOL to swap after keeping fee reserve.");
                }
            }
            lastPrice = currentPrice;
            console.log("-----------------------------------------------------------------", '\n');
        } catch (error) {
            console.error("Error in main loop: ", error);
        }

        await new Promise(resolve => setTimeout(resolve, FETCH_SOL_PRICE_TIME)); // Wait 60 seconds before next check
    }
}


main();