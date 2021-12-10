import React, { useState } from "react";
import styles from "../styles/components/proposal_list.module.scss";
import {
  areAddressesTheSame,
  doesIncludeAddress,
  downvote,
  upvote,
} from "../utils/contract";
import { IdentityView } from "./identity";

export default function ProposalList({
  proposals,
  userAddress,
  pollOwnerAddress,
  onUpvoted,
  onDownvoted,
}) {
  return proposals.map((p, i) => (
    <Upvote
      key={i}
      p={p}
      userAddress={userAddress}
      pollOwnerAddress={pollOwnerAddress}
      idx={i}
      onUpvoted={onUpvoted}
      onDownvoted={onDownvoted}
    />
  ));
}

function Upvote({
  p,
  userAddress,
  pollOwnerAddress,
  idx,
  onUpvoted,
  onDownvoted,
}) {
  const [isUpvoteMining, setIsUpvoteMining] = useState(false);
  const [isDownvoteMining, setIsDownvoteMining] = useState(false);

  return (
    <div className={"box " + styles.container}>
      <div className={styles.upvotes}>
        <div
          className={
            styles.up +
            (userAddress && doesIncludeAddress(p.upvotes, userAddress)
              ? " " + styles.orange
              : "")
          }
          onClick={(e) => {
            setIsUpvoteMining(true);
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
              });
          }}
        >
          {isUpvoteMining ? (
            <>
              <span className={styles.isMining}>Mining...</span>
              <button className={"button is-loading " + styles.fakeButton} />
            </>
          ) : (
            "▲"
          )}
        </div>
        <div className={styles.score}>
          {p.upvotes.length - p.downvotes.length}
        </div>
        <div
          className={
            styles.down +
            (doesIncludeAddress(p.downvotes, userAddress)
              ? " " + styles.orange
              : "")
          }
          onClick={(e) => {
            setIsDownvoteMining(true);
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
              });
          }}
        >
          {isDownvoteMining ? (
            <>
              <button className={"button is-loading " + styles.fakeButton} />
              <span className={styles.isMining}>Mining...</span>
            </>
          ) : (
            "▼"
          )}
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.title}>{p.title}</div>
        <div className={styles.createdBy}>
          Created by{" "}
          <IdentityView
            address={p.createdBy}
            isAddressMine={
              userAddress &&
              p.createdBy &&
              areAddressesTheSame(userAddress, p.createdBy)
            }
          />
        </div>
      </div>
    </div>
  );
}
