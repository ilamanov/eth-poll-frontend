import { ethers } from "ethers";
import contractABI from "../utils/eth_poll_contract_abi.json";

const CONTRACT_ADDRESS = "0xCa527ca6cc73974DF5D3222694Ab1cA1ED51815c";
const CONTRACT_ABI = contractABI.abi;
const NETWORK = "goerli";
export const PROPOSE_COST = 0.0025;
export const UPVOTE_COST = 0.00025;
export const DOWNVOTE_COST = 0.0005;

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
    about: poll.about,
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

  pollExtended.cycleCutoffs = [];
  if (poll.isActive) {
    const count = await ethPollContract.getCycleCount(pollOwnerAddress);
    for (let i = 0; i < count; i++) {
      pollExtended.cycleCutoffs.push(
        (await ethPollContract.getCycleCutoff(pollOwnerAddress, i)).toNumber()
      );
    }
  }

  return pollExtended;
}

export function createPoll(avatarUrl, title, about) {
  return getContract("private").createPoll(avatarUrl, title, about);
}

export function editPoll(avatarUrl, title, about) {
  return getContract("private").editPoll(avatarUrl, title, about);
}

export function submitProposal(pollOwnerAddress, proposalTitle) {
  return getContract("private").propose(pollOwnerAddress, proposalTitle, {
    value: ethers.utils.parseEther(PROPOSE_COST.toString()),
  });
}

export function upvote(pollOwnerAddress, proposalIndex) {
  return getContract("private").upvote(pollOwnerAddress, proposalIndex, {
    value: ethers.utils.parseEther(UPVOTE_COST.toString()),
  });
}

export function downvote(pollOwnerAddress, proposalIndex) {
  return getContract("private").downvote(pollOwnerAddress, proposalIndex, {
    value: ethers.utils.parseEther(DOWNVOTE_COST.toString()),
  });
}

export function endCycle() {
  return getContract("private").endCycle();
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
