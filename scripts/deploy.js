const hre = require("hardhat");

async function main() {
    const Voting = await hre.ethers.getContractFactory("Voting");
    const candidates = ["Alice", "Bob", "Charlie"];
    const voting = await Voting.deploy(candidates);

    await voting.waitForDeployment(); // Use this instead of .deployed()
    console.log(`✅ Voting Contract deployed to:`, await voting.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
