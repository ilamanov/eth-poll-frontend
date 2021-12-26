import React, { useState } from "react";
import styles from "../styles/components/blockchain_interaction_button.module.scss";

export default function BlockchainInteractionButton({
  wallet,
  shouldStartOnClick,
  startTransactionOnClick,
  onTransactionConfirmed,
  children,
  ...props
}) {
  const [phase, setPhase] = useState("notStarted");
  // const [error, setError] = useState(null);

  switch (phase) {
    case "notStarted":
      return (
        <button
          {...props}
          onClick={async () => {
            try {
              if (!(await shouldStartOnClick())) {
                return;
              }

              setPhase("waitingConfirmation");
              const transaction = await startTransactionOnClick();

              setPhase("mining");
              const receipt = await transaction.wait();

              setPhase("confirmed");
              onTransactionConfirmed(receipt);
            } catch (error) {
              setPhase("notStarted");
              // setError(error)
              if (error.code === 4001) {
                alert("Transaction was denied in MetaMask");
              } else {
                alert(error.message);
              }
            }
          }}
        >
          {children}
        </button>
      );
    case "waitingConfirmation":
      return (
        <button
          {...props}
          className={
            props.className +
            " " +
            styles.waitingConfirmation +
            " " +
            styles[wallet]
          }
        >
          {children}
        </button>
      );
    case "mining":
      return (
        <button {...props} className={props.className + " " + styles.mining}>
          {children}
        </button>
      );
    case "confirmed":
      return <button {...props}>{children}</button>;
  }
}
