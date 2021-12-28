import React, { useState } from "react";
import Image from "next/image";
import styles from "../styles/components/about.module.css";
import Modal from "./ui/modal";
import Account from "./ui/account";
import PollParams from "./poll_params";
import { editPoll, endCycle } from "../utils/contract";
import CostBadge from "./ui/cost_badge";
import BlockchainInteractionButton from "./blockchain_interaction_button";

export default function About({
  avatarUrl,
  title,
  about,
  address,
  isAddressMine,
  editable,
  endable,
}) {
  if (!editable) {
    editable = {};
  }
  if (!endable) {
    endable = {};
  }
  const [isPollParamsOpen, setIsPollParamsOpen] = useState(false);

  return (
    <>
      {editable.value && (
        <div className={styles.editContainer}>
          <Image
            className={styles.editButton}
            src="/pencil.png"
            alt="Edit"
            width={20}
            height={20}
            onClick={(e) => setIsPollParamsOpen(!isPollParamsOpen)}
          />
        </div>
      )}
      <div className={styles.avatarContainer}>
        {avatarUrl && (
          <Image
            src={avatarUrl}
            alt="Avatar"
            width={125}
            height={125}
            className={styles.avatar}
          />
        )}
      </div>
      <div className={styles.addressContainer}>
        <Account
          account={address}
          isAccountMine={isAddressMine}
          blockchain="ethereum"
          wallet="metamask"
        />
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.about}>{about}</div>
      {endable.value && (
        <div className={styles.endCycleButton}>
          <CostBadge network="ethereum">
            <BlockchainInteractionButton
              className="button is-green"
              wallet="metamask"
              shouldStartOnClick={() => true}
              startTransactionOnClick={endCycle}
              onTransactionConfirmed={endable.onEnded}
            >
              End Cycle
            </BlockchainInteractionButton>
          </CostBadge>
        </div>
      )}
      {editable.value && (
        <Modal isActive={isPollParamsOpen} setIsActive={setIsPollParamsOpen}>
          <PollParams
            pollOwnerAddress={editable.pollOwnerAddress}
            submitText="Edit Poll"
            startSubmit={editPoll}
            onSubmitted={editable.onPollEdited}
            initialValues={{ avatarUrl: avatarUrl, title: title, about: about }}
          />
        </Modal>
      )}
    </>
  );
}
