//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Voting {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    mapping(uint => Candidate) public candidates;
    mapping(address => bool) public voters;
    uint public candidatesCount;

    event Voted(uint indexed candidateId, address indexed voter);

    constructor(string[] memory candidateNames) {
        for (uint i = 0; i < candidateNames.length; i++) {
            candidates[i] = Candidate(i, candidateNames[i], 0);
            candidatesCount++;
        }
    }

    function vote(uint candidateId) public {
        require(!voters[msg.sender], "You have already voted.");
        require(candidateId < candidatesCount, "Invalid candidate.");

        voters[msg.sender] = true;
        candidates[candidateId].voteCount++;

        emit Voted(candidateId, msg.sender);
    }

    function getCandidate(uint candidateId) public view returns (string memory, uint) {
        require(candidateId < candidatesCount, "Invalid candidate.");
        return (candidates[candidateId].name, candidates[candidateId].voteCount);
    }
}
