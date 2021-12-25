import React, { useState } from "react";
import styles from "../styles/components/propose.module.css";
import { submitProposal, PROPOSE_COST } from "../utils/contract";
import BlockchainInteractionButton from "./blockchain_interaction_button";
import CostBadge from "./ui/cost_badge";

export default function Propose({ pollOwnerAddress, onProposalSubmitted }) {
  const [proposal, setProposal] = useState("");
  const [error, setError] = useState(false);

  const validate = () => {
    if (proposal === "") {
      setError(true);
      return false;
    }
    return true;
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
        <BlockchainInteractionButton
          className={"button is-green"}
          wallet="metamask"
          shouldStartOnClick={validate}
          startTransactionOnClick={() =>
            submitProposal(pollOwnerAddress, proposal)
          }
          onTransactionConfirmed={(txnReceipt) => onProposalSubmitted()}
        >
          Propose
        </BlockchainInteractionButton>
      </CostBadge>
    </div>
  );
}
