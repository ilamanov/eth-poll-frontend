import React, { useState } from "react";
import styles from "../styles/components/poll_not_active.module.css";
import { IdentityView } from "../components/identity";
import PollParams from "./poll_params";

export default function PollNotActive({ pollOwnerAddress, createPoll }) {
  const [isPollParamsOpen, setIsPollParamsOpen] = useState(false);

  return (
    <div>
      <div className={styles.text}>
        There is no poll at the provided address{" "}
        <IdentityView address={pollOwnerAddress} isAddressMine={false} />
      </div>
      <div className={styles.text}>
        If you own this address, you can create your poll.
      </div>
      <div className={styles.createPollButtonContainer}>
        <button
          className="button is-green"
          onClick={(e) => setIsPollParamsOpen(!isPollParamsOpen)}
        >
          Create Poll
        </button>
      </div>
      <PollParams
        isActive={isPollParamsOpen}
        setIsActive={setIsPollParamsOpen}
        pollOwnerAddress={pollOwnerAddress}
        onSubmit={createPoll}
        submitText="Submit Poll using MetaMask"
      />
    </div>
  );
}
