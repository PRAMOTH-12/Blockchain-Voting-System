require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { ethers } = require('ethers');

const app = express();
app.use(express.json());
app.use(cors());

// Load environment variables
const PORT = process.env.PORT || 5000;
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const CONTRACT_ABI = require('./contractABI.json').abi; // Extract ABI array

// ✅ FIX: Use ethers.JsonRpcProvider (For ethers v6)
const provider = new ethers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

// 🚀 API to get votes of a specific candidate
app.get('/candidate/:id', async (req, res) => {
    try {
        const candidateId = parseInt(req.params.id);
        const [name, voteCount] = await contract.getCandidate(candidateId);
        res.json({ success: true, candidate: { id: candidateId, name, voteCount: voteCount.toString() } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Error fetching candidate data" });
    }
});

// 🚀 API to cast a vote
app.post('/vote', async (req, res) => {
    try {
        const { candidateId } = req.body;
        const tx = await contract.vote(candidateId);
        await tx.wait();
        res.json({ success: true, message: "Vote cast successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Error casting vote" });
    }
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
