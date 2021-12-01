import Image from "next/image";
import styles from "../styles/components/twitter_footer.module.css";

const TWITTER_HANDLE = "nazar_ilamanov";

export default function TwitterFooter() {
  return (
    <footer className={styles.footer}>
      <Image
        src="/twitter-logo.svg"
        alt="Twitter Logo"
        width={32}
        height={32}
      />
      <a
        className={styles.footerText}
        href={`https://twitter.com/${TWITTER_HANDLE}`}
        target="_blank"
        rel="noreferrer"
      >
        built by @<span className={styles.twitterLink}>{TWITTER_HANDLE}</span>
      </a>
    </footer>
  );
}
