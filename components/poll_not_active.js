import React, { useState } from "react";
import styles from "../styles/components/poll_not_active.module.css";
import Modal from "./ui/modal";
import CostBadge from "./ui/cost_badge";
import Account from "./ui/account";
import PollParams from "./poll_params";
import { createPoll } from "../utils/contract";

export default function PollNotActive({ pollOwnerAddress, onPollCreated }) {
  const [isPollParamsOpen, setIsPollParamsOpen] = useState(false);

  return (
    <div>
      <div className={styles.text}>
        There is no poll at the provided address{" "}
        <Account
          account={pollOwnerAddress}
          isAccountMine={false}
          blockchain="ethereum"
          wallet="metamask"
        />
      </div>
      <div className={styles.text}>
        If you own this address, you can create your poll.
      </div>
      <div className={styles.createPollButtonContainer}>
        <CostBadge network="ethereum">
          <button
            className="button is-green"
            onClick={(e) => setIsPollParamsOpen(!isPollParamsOpen)}
          >
            Create Poll
          </button>
        </CostBadge>
      </div>
      <Modal isActive={isPollParamsOpen} onActiveChanged={setIsPollParamsOpen}>
        <PollParams
          pollOwnerAddress={pollOwnerAddress}
          submitText="Submit Poll"
          startSubmit={createPoll}
          onSubmitted={onPollCreated}
        />
      </Modal>
    </div>
  );
}
