import React, { useState } from "react";
import styles from "../styles/components/poll_not_active.module.css";
import { IdentityView } from "../components/identity";
import PollParams from "./poll_params";
import { createPoll } from "../utils/contract";

export default function PollNotActive({ pollOwnerAddress, onPollCreated }) {
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
        onSubmit={(avatarUrl, title, about) => {
          createPoll(avatarUrl, title, about)
            .then((txnHash) => {
              onPollCreated();
            })
            .catch((error) => {
              if (error.code === 4001) {
                alert("Transaction was denied in MetaMask");
              } else {
                alert(error.message);
              }
            });
        }}
        submitText="Submit Poll using MetaMask"
      />
    </div>
  );
}
