import { ethers } from "ethers";
import contractABI from "../utils/eth_poll_contract_abi.json";

export const CONTRACT_ADDRESS = "0x92442E534741B46c272dB358aBa7406f0d3be3Eb";
export const CONTRACT_ABI = contractABI.abi;

export async function getPoll(pollOwnerAddress) {
  if (!pollOwnerAddress) {
    return {};
  }
  if (!window.ethereum) {
    alert("You need MetaMask!");
    // TODO remove this if we add Infura
    return;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const ethPollContract = new ethers.Contract(
    CONTRACT_ADDRESS,
    CONTRACT_ABI,
    provider
  );

  const poll = await ethPollContract.polls(pollOwnerAddress);
  return poll;
}

export async function createPoll(avatarUrl, title, about) {
  if (!window.ethereum) {
    alert("You need MetaMask!");
    return;
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const ethPollContract = new ethers.Contract(
    CONTRACT_ADDRESS,
    CONTRACT_ABI,
    signer
  );

  const pollTxn = await ethPollContract.createPoll(avatarUrl, title, about);
  // console.log("Mining...", pollTxn.hash);
  await pollTxn.wait();
  // console.log("Mined -- ", pollTxn.hash);
  return pollTxn.hash;
}

export async function editPoll(avatarUrl, title, about) {
  if (!window.ethereum) {
    alert("You need MetaMask!");
    return;
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const ethPollContract = new ethers.Contract(
    CONTRACT_ADDRESS,
    CONTRACT_ABI,
    signer
  );

  const pollTxn = await ethPollContract.editPoll(avatarUrl, title, about);
  // console.log("Mining...", pollTxn.hash);
  await pollTxn.wait();
  // console.log("Mined -- ", pollTxn.hash);
  return pollTxn.hash;
}

export async function submitProposal(pollOwnerAddress, proposalTitle) {
  if (!window.ethereum) {
    alert("You need MetaMask!");
    return;
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const ethPollContract = new ethers.Contract(
    CONTRACT_ADDRESS,
    CONTRACT_ABI,
    signer
  );

  const proposalTxn = await ethPollContract.propose(
    pollOwnerAddress,
    proposalTitle
  );
  // console.log("Mining...", proposalTxn.hash);
  await proposalTxn.wait();
  // console.log("Mined -- ", proposalTxn.hash);
  return proposalTxn.hash;
}

export async function getProposals(pollOwnerAddress) {
  if (!pollOwnerAddress) {
    return [];
  }
  if (!window.ethereum) {
    alert("You need MetaMask!");
    // TODO remove this if we add Infura
    return;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const ethPollContract = new ethers.Contract(
    CONTRACT_ADDRESS,
    CONTRACT_ABI,
    provider
  );

  const count = await ethPollContract.getProposalCount(pollOwnerAddress);
  const proposals = [];
  for (let i = 0; i < count; i++) {
    proposals.push(await ethPollContract.getProposal(pollOwnerAddress, i));
  }
  return proposals;
}

export async function upvote(pollOwnerAddress, proposalIndex) {
  if (!window.ethereum) {
    alert("You need MetaMask!");
    return;
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const ethPollContract = new ethers.Contract(
    CONTRACT_ADDRESS,
    CONTRACT_ABI,
    signer
  );

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
  if (!window.ethereum) {
    alert("You need MetaMask!");
    return;
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const ethPollContract = new ethers.Contract(
    CONTRACT_ADDRESS,
    CONTRACT_ABI,
    signer
  );

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
  return ethers.utils.getAddress(addr1) === ethers.utils.getAddress(addr2);
}

export function doesIncludeAddress(array, addr) {
  for (let addr2 of array) {
    if (areAddressesTheSame(addr, addr2)) {
      return true;
    }
  }
  return false;
}
