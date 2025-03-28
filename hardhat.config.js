require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // Load environment variables

module.exports = {
  solidity: {
    compilers: [
      { version: "0.8.28" }, 
      { version: "0.8.20" },
      { version: "0.8.18" }
    ],
  },
  networks: {
    sepolia: {
      url: process.env.ALCHEMY_SEPOLIA_URL || "https://eth-sepolia.g.alchemy.com/v2/xOSKAR1-iC6USiKZZCuwvLG5uGGJYcAu",  
      accounts: process.env.PRIVATE_KEY ? [`0x${process.env.PRIVATE_KEY}`] : [], // Ensure PRIVATE_KEY exists
    },
  },
};

// ✅ Run this function only when executing as a script, NOT during config loading
if (require.main === module) {
  async function getBalance() {
    const hre = require("hardhat");
    const ethers = hre.ethers; // Use Hardhat's built-in ethers

    const provider = new ethers.providers.JsonRpcProvider(
      process.env.ALCHEMY_SEPOLIA_URL
    );

    const balance = await provider.getBalance("YOUR_WALLET_ADDRESS");
    console.log(`Balance: ${ethers.utils.formatEther(balance)} ETH`);
  }

  getBalance(); // Call the function only when running manually
}
