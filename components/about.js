import React, { useState } from "react";
import Image from "next/image";
import styles from "../styles/components/about.module.css";
import { IdentityView } from "./identity";
import PollParams from "./poll_params";
import { editPoll } from "../utils/contract";

export default function About({
  avatarUrl,
  title,
  about,
  address,
  isAddressMine,
  editable,
}) {
  if (!editable) {
    editable = {};
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
        <IdentityView address={address} isAddressMine={isAddressMine} />
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.about}>{about}</div>
      {editable.value && (
        <PollParams
          isActive={isPollParamsOpen}
          setIsActive={setIsPollParamsOpen}
          pollOwnerAddress={editable.pollOwnerAddress}
          onSubmit={(avatarUrl, title, about) => {
            editPoll(avatarUrl, title, about)
              .then((txnHash) => {
                editable.onPollEdited();
              })
              .catch((error) => {
                if (error.code === 4001) {
                  alert("Transaction was denied in MetaMask");
                } else {
                  alert(error.message);
                }
              });
          }}
          submitText="Edit Poll using MetaMask"
          initialValues={{ avatarUrl: avatarUrl, title: title, about: about }}
        />
      )}
    </>
  );
}
