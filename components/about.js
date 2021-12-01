import Image from "next/image";
import styles from "../styles/components/about.module.css";

export default function About({ avatarUrl, title, about }) {
  return (
    <>
      <div className={styles.avatarContainer}>
        <Image
          src={avatarUrl}
          alt="Avatar"
          width={125}
          height={125}
          className={styles.avatar}
        />
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.about}>{about}</div>
    </>
  );
}
