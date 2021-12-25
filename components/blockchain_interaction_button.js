import React, { useState } from "react";
import styles from "../styles/components/blockchain_interaction_button.module.scss";

export default function BlockchainInteractionButton({
  className,
  style,
  children,
  shouldStartOnClick,
  startTransactionOnClick,
  onTransactionConfirmed,
}) {
  const [phase, setPhase] = useState("notStarted");
  // const [error, setError] = useState(null);

  switch (phase) {
    case "notStarted":
      return (
        <button
          className={className}
          style={style}
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
        <button className={className} style={style}>
          waiting
        </button>
      );
    case "mining":
      return (
        <button className={className} style={style}>
          mining
        </button>
      );
    case "confirmed":
      return (
        <button className={className} style={style}>
          confirmed
        </button>
      );
  }
}
