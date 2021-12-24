// import styled, { keyframes } from "styled-components";
import styles from "../../styles/components/ui/waving_hand.module.scss";

export default function WavingHand() {
  return (
    <div>
      <span className={styles.wave} role="img" aria-label="Waving hand">
        👋
      </span>
    </div>
  );
}

// const wave = keyframes`
//   from {
//     transform: translateY(10px);
//   }
//   to {
//     transform: translateY(-10px);
//   }
// `;

// const Span = styled.span`
//   font-size: 32px;
//   animation: ${wave} 1000ms infinite alternate ease-in-out;
//   transform-origin: 75% 80%;
// `;
