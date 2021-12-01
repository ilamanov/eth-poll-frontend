import React, { useEffect, useState } from "react";
import styles from "../styles/components/identity.module.css";

export default function Identity({ onIdentityChanged }) {
  const [userAddress, setUserAddress] = useState("");

  const checkIfWalletIsConnected = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length > 0) {
        const account = accounts[0];
        setUserAddress(account);
      }
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    if (onIdentityChanged) {
      onIdentityChanged(userAddress);
    }
  }, [userAddress]);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Get MetaMask!");
      return;
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setUserAddress(accounts[0]);
  };

  return userAddress ? (
    <div>
      Connected with <IdentityView address={userAddress} isAddressMine={true} />
    </div>
  ) : (
    <button className="button is-orange" onClick={connectWallet}>
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
