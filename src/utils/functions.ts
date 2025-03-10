import { Connection, Keypair, PublicKey, VersionedTransaction } from "@solana/web3.js";
import { PRIVATE_KEY, QUOTE_MINT, RPC_ENDPOINT } from "../contants";
import base58 from "bs58";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import axios from "axios";
const solanaConnection = new Connection(RPC_ENDPOINT, "processed");
export async function getTokenBalance() {
    try {
        const solanaConnection = new Connection(RPC_ENDPOINT, "processed");
        const keypair = Keypair.fromSecretKey(base58.decode(PRIVATE_KEY));
        const walletPublicKey = keypair.publicKey;
        const tokenMintPublicKey = new PublicKey(QUOTE_MINT);

        // Derive the Associated Token Account (ATA)
        const tokenAccount = await getAssociatedTokenAddress(tokenMintPublicKey, walletPublicKey);

        // Check if the token account exists
        const accountInfo = await solanaConnection.getAccountInfo(tokenAccount);
        if (!accountInfo) {
            console.warn("Token account does not exist.");
            return 0; // Return 0 instead of null for better handling
        }

        // Get the balance
        const balance = await solanaConnection.getTokenAccountBalance(tokenAccount);
        console.log(`Token Balance: ${balance.value.uiAmount}`);

        return balance.value.uiAmount ?? 0; // Ensure a valid return value
    } catch (error) {
        console.error("Error fetching token balance:", error);
        return 0; // Return 0 in case of an error to maintain consistency
    }
}

export async function getSolBalance() {
    try {
        const solanaConnection = new Connection(RPC_ENDPOINT, "processed");
        const keypair = Keypair.fromSecretKey(base58.decode(PRIVATE_KEY));
        const walletPublicKey = keypair.publicKey;
        let solBalance = await solanaConnection.getBalance(new PublicKey(walletPublicKey));
        console.log(`Wallet Balance: ${solBalance / (10 ** 9)}`)
        let solBalancePerLam = solBalance / (10 ** 9);
        return solBalancePerLam;
    } catch (error) {
        console.error("Error fetching Sol balance:", error);
        return 0; // Return 0 in case of an error to maintain consistency
    }
}

export async function getSOLPrice() {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
        const solPrice = response.data.solana.usd;
        console.log('Price of SOL:', solPrice, 'USD');
        return solPrice;
    } catch (error) {
        console.error('Error fetching SOL price:', error);
    }
}

export const getBuyTxWithJupiter = async (wallet: Keypair, quoteMint: PublicKey, amount: number) => {
    try {
        const quoteResponse = await (
            await fetch(
                `https://quote-api.jup.ag/v6/quote?inputMint=So11111111111111111111111111111111111111112&outputMint=${quoteMint.toBase58()}&amount=${amount}&slippageBps=1000&swapMode=ExactOut`
            )
        ).json();

        console.log("🚀 ~ getBuyTxWithJupiter ~ quoteResponse:", quoteResponse)
        // get serialized transactions for the swap
        const { swapTransaction } = await (
            await fetch("https://quote-api.jup.ag/v6/swap", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    quoteResponse,
                    userPublicKey: wallet.publicKey.toString(),
                    wrapAndUnwrapSol: true,
                    dynamicComputeUnitLimit: true,
                    prioritizationFeeLamports: 52000
                }),
            })
        ).json();

        // deserialize the transaction
        const swapTransactionBuf = Buffer.from(swapTransaction, "base64");
        var transaction = VersionedTransaction.deserialize(swapTransactionBuf);

        // sign the transaction
        transaction.sign([wallet]);
        console.log(await solanaConnection.simulateTransaction(transaction, { sigVerify: true }))
        return transaction
    } catch (error) {
        // console.log("Failed to get buy transaction")
        return null
    }
};

export const getSellTxWithJupiter = async (wallet: Keypair, baseMint: PublicKey, amount: number) => {
    try {
        const quoteResponse = await (
            await fetch(
                `https://quote-api.jup.ag/v6/quote?inputMint=${baseMint.toBase58()}&outputMint=So11111111111111111111111111111111111111112&amount=${amount}&slippageBps=1000`
            )
        ).json();
        console.log("🚀 ~ getSellTxWithJupiter ~ quoteResponse:", quoteResponse)

        // get serialized transactions for the swap
        const { swapTransaction } = await (
            await fetch("https://quote-api.jup.ag/v6/swap", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    quoteResponse,
                    userPublicKey: wallet.publicKey.toString(),
                    wrapAndUnwrapSol: true,
                    dynamicComputeUnitLimit: true,
                    prioritizationFeeLamports: 52000
                }),
            })
        ).json();

        // deserialize the transaction
        const swapTransactionBuf = Buffer.from(swapTransaction, "base64");
        var transaction = VersionedTransaction.deserialize(swapTransactionBuf);

        // sign the transaction
        transaction.sign([wallet]);
        console.log(await solanaConnection.simulateTransaction(transaction, { sigVerify: true }))
        return transaction
    } catch (error) {
        // console.log("Failed to get sell transaction")
        return null
    }
};

