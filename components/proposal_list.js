import React, { useState } from "react";
import Image from "next/image";
import styles from "../styles/components/proposal_list.module.scss";
import { areAddressesTheSame } from "../utils/contract";
import { IdentityView } from "./identity";

export default function ProposalList({ proposals, userAddress }) {
  function upvote() {}
  function downvote() {}

  return proposals.map((p, i) => (
    <div key={i} className={"box " + styles.container}>
      <div className={styles.upvotes}>
        <div className={styles.up}>▲</div>
        <div className={styles.score}>
          {p.upvotes.length - p.downvotes.length}
        </div>
        <div className={styles.down}>▼</div>
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
