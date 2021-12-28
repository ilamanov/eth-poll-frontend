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
import BlockchainInteractionButton from "./blockchain_interaction_button";
import Account from "./ui/account";
import CostBadge from "./ui/cost_badge";

export default function ProposalList({
  proposals,
  newProposalsCutoffIndex,
  userAddress,
  pollOwnerAddress,
  onUpvoted,
  onDownvoted,
}) {
  const elements = [];
  for (let i = 0; i < proposals.length; i++) {
    if (i === newProposalsCutoffIndex) {
      elements.push(<Separator key={i} />);
    }
    elements.push(
      <Proposal
        key={i >= newProposalsCutoffIndex ? i + 1 : i}
        proposal={proposals[i]}
        userAddress={userAddress}
        pollOwnerAddress={pollOwnerAddress}
        idx={i}
        onUpvoted={onUpvoted}
        onDownvoted={onDownvoted}
      />
    );
  }
  return elements;
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
          startTransactionOnClick={() => upvote(pollOwnerAddress, idx)}
          onTransactionConfirmed={onUpvoted}
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
          startTransactionOnClick={() => downvote(pollOwnerAddress, idx)}
          onTransactionConfirmed={onDownvoted}
        />
      </div>
      <div className={styles.info}>
        <div className={styles.title}>{proposal.title}</div>
        <div className={styles.createdBy}>
          Created by{" "}
          <Account
            account={proposal.createdBy}
            isAccountMine={
              userAddress &&
              proposal.createdBy &&
              areAddressesTheSame(userAddress, proposal.createdBy)
            }
            blockchain="ethereum"
            wallet="metamask"
          />
        </div>
      </div>
    </div>
  );
}

function Arrow({
  direction,
  isHighlighted,
  cost,
  startTransactionOnClick,
  onTransactionConfirmed,
}) {
  const [isMining, setIsMining] = useState(false);

  let button = (
    <BlockchainInteractionButton
      className={`button ${styles.arrowButton} ${
        isHighlighted ? styles.highlighted : ""
      }`}
      wallet="metamask"
      shouldStartOnClick={() => true}
      startTransactionOnClick={startTransactionOnClick}
      onTransactionConfirmed={onTransactionConfirmed}
    >
      {direction === "up" ? "▲" : "▼"}
    </BlockchainInteractionButton>
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

function Separator() {
  return (
    <div className={styles.separator}>--------- Older Proposals ---------</div>
  );
}
