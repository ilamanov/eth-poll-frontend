import React, { useEffect, useState } from "react";
import styles from "../styles/components/identity.module.css";

async function connect(onConnected) {
  if (!window.ethereum) {
    alert("Get MetaMask!");
    return;
  }

  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  onConnected(accounts[0]);
}

async function checkIfWalletIsConnected(isMobileDevice, onConnected) {
  if (window.ethereum) {
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    if (accounts.length > 0) {
      const account = accounts[0];
      onConnected(account);
      return;
    }

    if (isMobileDevice) {
      await connect(onConnected);
    }
  }
}

export default function Identity({ onIdentityChanged }) {
  const [isMobileDevice, setIsMobileDevice] = useState(undefined);
  const [userAddress, setUserAddress] = useState("");

  useEffect(() => {
    checkIfWalletIsConnected(isMobileDevice, setUserAddress);
  }, []);

  useEffect(() => {
    setIsMobileDevice(
      "ontouchstart" in window || "onmsgesturechange" in window
    );
  }, []);

  useEffect(() => {
    if (onIdentityChanged) {
      onIdentityChanged(userAddress);
    }
  }, [userAddress]);

  return userAddress ? (
    <div>
      Connected with <IdentityView address={userAddress} isAddressMine={true} />
    </div>
  ) : (
    <Connect isMobileDevice={isMobileDevice} setUserAddress={setUserAddress} />
  );
}

function Connect({ isMobileDevice, setUserAddress }) {
  if (isMobileDevice) {
    const dappUrl = "metamask-auth.ilamanov.repl.co"; // TODO enter your dapp URL. For example: https://uniswap.exchange. (don't enter the "https://")
    const metamaskAppDeepLink = "https://metamask.app.link/dapp/" + dappUrl;
    return (
      <a href={metamaskAppDeepLink}>
        <button className={styles.button}>Connect to MetaMask</button>
      </a>
    );
  }

  return (
    <button
      className="button is-orange"
      onClick={() => connect(setUserAddress)}
    >
      Connect to MetaMask
    </button>
  );
}

export function IdentityView({ address, isAddressMine }) {
  if (!address) {
    return <span className={styles.address}></span>;
  }
  return (
    <span
      className={
        styles.address + (isAddressMine ? ` ${styles.isAddressMine}` : "")
      }
    >
      {address.substring(0, 5)}…{address.substring(address.length - 4)}
    </span>
  );
}
