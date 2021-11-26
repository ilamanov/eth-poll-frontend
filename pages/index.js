import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const TWITTER_HANDLE = "nazar_ilamanov";

export default function Home() {
  const wave = () => {};
  return (
    <div className={styles.container}>
      <Head>
        <title>Ξ ETH Poll</title>
        <meta name="description" content="Vote with Ethereum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <div className={styles.avatarContainer}>
          <Image
            src="/avatar.jpeg"
            alt="Avatar"
            width={125}
            height={125}
            className={styles.avatar}
          />
        </div>
        <div className={styles.title}>👋 Hey, this is Nazar</div>
        <div className={styles.bio}>
          Let me know what web3 concept you would like me to explain!
        </div>

        <div className={styles.proposeContainer}>
          <input type="text" className={styles.proposeInput} />
          <button className={styles.proposeButton} onClick={wave}>
            Propose
          </button>
        </div>
      </header>

      <main className={styles.main}></main>

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
    </div>
  );
}
