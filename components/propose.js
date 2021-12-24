import React, { useState } from "react";
import styles from "../styles/components/propose.module.css";
import { submitProposal, PROPOSE_COST } from "../utils/contract";
import CostBadge from "./ui/cost_badge";

export default function Propose({ pollOwnerAddress, onProposalSubmitted }) {
  const [error, setError] = useState(false);
  const [proposal, setProposal] = useState("");
  const [isMining, setMining] = useState(false);

  const propose = async () => {
    if (proposal === "") {
      setError(true);
      return;
    }

    setMining(true);

    submitProposal(pollOwnerAddress, proposal)
      .then((txnHash) => {
        onProposalSubmitted();
      })
      .catch((error) => {
        if (error.code === 4001) {
          alert("Transaction was denied in MetaMask");
        } else {
          alert(error.message);
        }
      });
  };

  return (
    <div className={styles.container}>
      <div className={"field " + styles.inputContainer}>
        <div className="control">
          <input
            className={"input " + styles.input + (error ? " is-danger" : "")}
            type="text"
            placeholder="Propose something!"
            value={proposal}
            onChange={(e) => setProposal(e.target.value)}
          />
        </div>
        {error && <p className="help is-danger">Proposal can not be empty</p>}
      </div>
      <CostBadge amount={PROPOSE_COST} network="ethereum">
        <button
          className={"button is-green" + (isMining ? " is-loading" : "")}
          onClick={propose}
        >
          Propose
        </button>
      </CostBadge>
      {isMining && "Mining..."}
    </div>
  );
}
