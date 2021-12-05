import React, { useState } from "react";
import Image from "next/image";
import styles from "../styles/components/about.module.css";
import { IdentityView } from "./identity";
import PollParams from "./poll_params";

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
          onSubmit={editable.onEdit}
          submitText="Edit Poll using MetaMask"
          initialValues={{ avatarUrl: avatarUrl, title: title, about: about }}
        />
      )}
    </>
  );
}
