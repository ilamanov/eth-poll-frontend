import React from "react";
import styles from "../styles/components/proposal_list.module.scss";
import { areAddressesTheSame, doesIncludeAddress } from "../utils/contract";
import { IdentityView } from "./identity";

export default function ProposalList({
  proposals,
  userAddress,
  upvote,
  downvote,
}) {
  return proposals.map((p, i) => (
    <div key={i} className={"box " + styles.container}>
      <div className={styles.upvotes}>
        <div
          className={
            styles.up +
            (doesIncludeAddress(p.upvotes, userAddress)
              ? " " + styles.orange
              : "")
          }
          onClick={(e) => upvote(i)}
        >
          ▲
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
          onClick={(e) => downvote(i)}
        >
          ▼
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.title}>{p.title}</div>
        <div className={styles.createdBy}>
          Created by{" "}
          <IdentityView
            address={p.createdBy}
            isAddressMine={areAddressesTheSame(userAddress, p.createdBy)}
          />
        </div>
      </div>
    </div>
  ));
}
