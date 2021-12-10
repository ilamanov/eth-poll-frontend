import { ethers } from "ethers";
import contractABI from "../utils/eth_poll_contract_abi.json";

const CONTRACT_ADDRESS = "0x92442E534741B46c272dB358aBa7406f0d3be3Eb";
const CONTRACT_ABI = contractABI.abi;
const NETWORK = "goerli";

function getContract(transactionType) {
  let provider;
  if (transactionType === "public") {
    provider = ethers.getDefaultProvider(NETWORK, {
      infura: process.env.INFURA_PROJECT_ID,
    });
  } else if (transactionType === "private") {
    if (!window.ethereum) {
      alert("You need to connect to MetaMask!");
      return null;
    }
    provider = new ethers.providers.Web3Provider(window.ethereum).getSigner();
  } else {
    throw "Unknown transaction type " + transactionType;
  }
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
}

export async function getPollData(pollOwnerAddress) {
  if (!pollOwnerAddress) {
    return {};
  }

  const ethPollContract = getContract("public");

  const poll = await ethPollContract.polls(pollOwnerAddress);
  const pollExtended = {
    isActive: poll.isActive,
    avatarUrl: poll.avatarUrl,
    title: poll.title,
    about: poll.bio,
    createdTimestamp: poll.createdTimestamp.toString(),
  };
  pollExtended.ownerAddress = pollOwnerAddress;

  pollExtended.proposals = [];
  if (poll.isActive) {
    const count = await ethPollContract.getProposalCount(pollOwnerAddress);
    for (let i = 0; i < count; i++) {
      const proposal = await ethPollContract.getProposal(pollOwnerAddress, i);
      pollExtended.proposals.push({
        title: proposal.title,
        createdBy: proposal.createdBy,
        upvotes: proposal.upvotes,
        downvotes: proposal.downvotes,
      });
    }
  }

  return pollExtended;
}

export function createPoll(avatarUrl, title, about) {
  return getContract("private")
    .createPoll(avatarUrl, title, about)
    .then((pollTxn) => {
      return pollTxn.wait(); // wait until mined
    })
    .then((receipt) => {
      return receipt.transactionHash;
    });
}

export function editPoll(avatarUrl, title, about) {
  return getContract("private")
    .editPoll(avatarUrl, title, about)
    .then((pollTxn) => {
      return pollTxn.wait(); // wait until mined
    })
    .then((receipt) => {
      return receipt.transactionHash;
    });
}

export function submitProposal(pollOwnerAddress, proposalTitle) {
  return getContract("private")
    .propose(pollOwnerAddress, proposalTitle)
    .then((proposalTxn) => {
      return proposalTxn.wait(); // wait until mined
    })
    .then((receipt) => {
      return receipt.transactionHash;
    });
}

export async function upvote(pollOwnerAddress, proposalIndex) {
  const ethPollContract = getContract("private");

  const upvoteTxn = await ethPollContract.upvote(
    pollOwnerAddress,
    proposalIndex
  );
  // console.log("Mining...", upvoteTxn.hash);
  await upvoteTxn.wait();
  // console.log("Mined -- ", upvoteTxn.hash);
  return upvoteTxn.hash;
}

export async function downvote(pollOwnerAddress, proposalIndex) {
  const ethPollContract = getContract("private");

  const downvoteTxn = await ethPollContract.downvote(
    pollOwnerAddress,
    proposalIndex
  );
  // console.log("Mining...", downvoteTxn.hash);
  await downvoteTxn.wait();
  // console.log("Mined -- ", downvoteTxn.hash);
  return downvoteTxn.hash;
}

export function areAddressesTheSame(addr1, addr2) {
  return (
    addr1 &&
    addr2 &&
    ethers.utils.getAddress(addr1) === ethers.utils.getAddress(addr2)
  );
}

export function doesIncludeAddress(array, addr) {
  for (let addr2 of array) {
    if (areAddressesTheSame(addr, addr2)) {
      return true;
    }
  }
  return false;
}
