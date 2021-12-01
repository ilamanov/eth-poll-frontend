import Image from "next/image";
import styles from "../styles/components/about.module.css";
import { IdentityView } from "./identity";

export default function About({ avatarUrl, title, about, address }) {
  return (
    <>
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
        <IdentityView address={address} mine={false} />
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.about}>{about}</div>
    </>
  );
}
