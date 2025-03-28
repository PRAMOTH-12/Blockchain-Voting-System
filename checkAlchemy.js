require('dotenv').config();
const { ethers } = require('ethers');

// Load API Key from .env
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

// Connect to Sepolia network
const provider = new ethers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`);

async function main() {
    try {
        const blockNumber = await provider.getBlockNumber();
        console.log(`✅ Connected to Sepolia! Current block: ${blockNumber}`);
    } catch (error) {
        console.error("❌ Error connecting to Alchemy:", error);
    }
}

main();
