# 🚀 **Make-SOL-bot** 

The Make-SOL-bot is an automated trading tool designed to protect your assets from SOL price fluctuations. It automatically swaps all SOL in your wallet to USDC when the SOL price drops below a set threshold and converts USDC back to SOL when the price rises above a specified limit. This ensures that you minimize potential losses during volatile market conditions.

### 🎯 **Key Features**

- 🛰️ **Automatic SOL to USDC Swap**: 
    Converts all SOL to USDC if the price falls below the defined limit.

- 🛰️ **Automatic USDC to SOL Swap**: 
    Converts all USDC to SOL if the price exceeds the defined limit.
  
- 🔍 **Customizable Parameters**: 
    Users can configure fetch intervals, price limits, and balance thresholds.

- 📊 **Loss Protection**: 
    Prevents losses due to SOL price fluctuations.

- ⚡ **JITO Support**: 
    Enables Jito fee configuration for optimized transactions.

---


## 📞 **Stay Connected**

Gmail: benjamin.bigdev@gmail.com

Discord: @.benjamincup

## 🧑‍💻 **Environment Variables**

Create a .env file and add the following configuration:

PRIVATE_KEY=
RPC_ENDPOINT=
RPC_WEBSOCKET_ENDPOINT=
QUOTE_MINT=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v
MAIN_MINT=So11111111111111111111111111111111111111112
COMMITMENT_LEVEL=confirmed
IS_JITO=true
JITO_FEE=0.00001

FETCH_SOL_PRICE_TIME = 60000
LIMIT_SOL_PRICE = 180
MIN_SOL_BALANCE = 0.3
UPLIMITPRICE = 1
DOWNLIMITPRICE = 0.1

## 🚀 **Getting Started**

Follow these steps to get your **Make-SOL-bot** up and running!

### Installation

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/Benjamin-cup/Make-SOL-bot.git
    ```

2. **Install Dependencies**:

    Navigate to the project directory and run the following command:

    ```bash
    cd Make-SOL-bot
    npm install
    ```

3. **Configure API Token**:

    Replace the API token in the `ENDPOINT` variable:

    ```ts
    const ENDPOINT = 
    ```
    And set other variables in env file.

4. **Run the Bot**:

    Start the bot by running:

    ```bash
    npm run start
    ```

---

## 🧑‍💻 **Notes**

The bot requires a valid Solana RPC provider to function properly.

Ensure your wallet has enough SOL for transaction fees.

JITO fee settings can be adjusted as needed.

Always review your configuration before running the bot.