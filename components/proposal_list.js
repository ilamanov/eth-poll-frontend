import React, { useState } from "react";
import styles from "../styles/components/proposal_list.module.scss";
import {
  areAddressesTheSame,
  doesIncludeAddress,
  downvote,
  DOWNVOTE_COST,
  upvote,
  UPVOTE_COST,
} from "../utils/contract";
import { IdentityView } from "./identity";
import CostBadge from "./ui/cost_badge";

export default function ProposalList({
  proposals,
  userAddress,
  pollOwnerAddress,
  onUpvoted,
  onDownvoted,
}) {
  return proposals.map((proposal, i) => (
    <Proposal
      key={i}
      proposal={proposal}
      userAddress={userAddress}
      pollOwnerAddress={pollOwnerAddress}
      idx={i}
      onUpvoted={onUpvoted}
      onDownvoted={onDownvoted}
    />
  ));
}

function Proposal({
  proposal,
  userAddress,
  pollOwnerAddress,
  idx,
  onUpvoted,
  onDownvoted,
}) {
  return (
    <div className={"box " + styles.proposalContainer}>
      <div className={styles.scoreContainer}>
        <Arrow
          direction="up"
          isHighlighted={
            userAddress && doesIncludeAddress(proposal.upvotes, userAddress)
          }
          cost={idx === 0 ? UPVOTE_COST : null}
          onClick={() =>
            upvote(pollOwnerAddress, idx)
              .then((txnHash) => {
                onUpvoted();
              })
              .catch((error) => {
                if (error.code === 4001) {
                  alert("Transaction was denied in MetaMask");
                } else {
                  alert(error.message);
                }
              })
          }
        />
        <div className={styles.score}>
          {proposal.upvotes.length - proposal.downvotes.length}
        </div>
        <Arrow
          direction="down"
          isHighlighted={
            userAddress && doesIncludeAddress(proposal.downvotes, userAddress)
          }
          cost={idx === 0 ? DOWNVOTE_COST : null}
          onClick={() =>
            downvote(pollOwnerAddress, idx)
              .then((txnHash) => {
                onDownvoted();
              })
              .catch((error) => {
                if (error.code === 4001) {
                  alert("Transaction was denied in MetaMask");
                } else {
                  alert(error.message);
                }
              })
          }
        />
      </div>
      <div className={styles.info}>
        <div className={styles.title}>{proposal.title}</div>
        <div className={styles.createdBy}>
          Created by{" "}
          <IdentityView
            address={proposal.createdBy}
            isAddressMine={
              userAddress &&
              proposal.createdBy &&
              areAddressesTheSame(userAddress, proposal.createdBy)
            }
          />
        </div>
      </div>
    </div>
  );
}

function Arrow({ direction, isHighlighted, cost, onClick }) {
  const [isMining, setIsMining] = useState(false);

  let button = (
    <button
      className={`button ${styles.arrowButton} ${
        isMining ? "is-loading" : ""
      } ${isHighlighted ? styles.highlighted : ""}`}
      onClick={() => {
        setIsMining(true);
        onClick();
      }}
    >
      {direction === "up" ? "▲" : "▼"}
    </button>
  );

  if (cost) {
    button = (
      <CostBadge amount={cost} network="ethereum">
        {button}
      </CostBadge>
    );
  }

  return (
    <div className={styles.arrowContainer}>
      {button}
      {isMining && <span className={styles.isMiningText}>Mining...</span>}
    </div>
  );
}
