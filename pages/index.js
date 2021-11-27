import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const TWITTER_HANDLE = "nazar_ilamanov";

export default function Home() {
  const [currentAccount, setCurrentAccount] = useState("");

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      /*
       * Check if we're authorized to access the user's wallet
       */
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const wave = () => {};

  return (
    <div className={styles.container}>
      <Head>
        <title>Ξ ETH Poll</title>
        <meta name="description" content="Vote with Ethereum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <div className={styles.navBar}>
          {currentAccount ? (
            <div>
              Connected with <Account address={currentAccount} />
            </div>
          ) : (
            <button
              className={styles.connectWalletButton}
              onClick={connectWallet}
            >
              Connect to MetaMask
            </button>
          )}
        </div>
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

function Account({ address }) {
  return (
    <span className={styles.address}>
      {address.substring(0, 4)}…{address.substring(address.length - 4)}
    </span>
  );
}
