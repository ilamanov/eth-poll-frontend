import React from "react";
import Image from "next/image";
import styles from "../../styles/components/ui/cost_badge.module.scss";

export default function CostBadge({ amount, network, children }) {
  let text;
  if (amount === 0 || amount === undefined) {
    text = "gas fees";
  } else {
    if (amount < 0.01) {
      text = `${amount / 0.001} m`;
    } else {
      text = `${amount} `;
    }

    if (network === "ethereum") {
      text += "ETH";
    } else if (network === "solana") {
      text += "SOL";
    }
  }

  let imgSrc, imgAlt;
  if (network === "ethereum") {
    imgSrc = "/eth-coin.png";
    imgAlt = "ethereum logo";
  } else if (network === "solana") {
    imgSrc = "/sol-coin.png";
    imgAlt = "solana logo";
  }

  return (
    <div className={`${styles.container}`}>
      {children}
      <div className={`${styles.badgeContainer} ${styles[network]}`}>
        <div className={styles.badge}>
          <div className={styles.imgContainer}>
            <Image src={imgSrc} alt={imgAlt} width={23} height={23} />
          </div>
          <div className={styles.textContainer}>{text}</div>
        </div>
      </div>
    </div>
  );
}
