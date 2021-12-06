import React, { useState } from "react";
import styles from "../styles/components/propose.module.css";

export default function Propose({ submitProposal }) {
  const [error, setError] = useState(false);
  const [proposal, setProposal] = useState("");
  const [isMining, setMining] = useState(false);

  const propose = async () => {
    if (proposal === "") {
      setError(true);
      return;
    }

    setMining(true);
    submitProposal(proposal);
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
      <button
        className={"button is-green" + (isMining ? " is-loading" : "")}
        onClick={propose}
      >
        Propose
      </button>
    </div>
  );
}
