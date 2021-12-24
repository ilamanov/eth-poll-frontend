import React, { useState } from "react";
import Image from "next/image";
import styles from "../../styles/components/ui/help_button.module.scss";
import Modal from "./modal";
import CostBadge from "./cost_badge";
import { DOWNVOTE_COST, PROPOSE_COST, UPVOTE_COST } from "../../utils/contract";

export default function HelpButton() {
  const [isModalOpen, setIsModalOpen] = useState("");

  return (
    <>
      <button
        data-aos="fade-up-left"
        data-aos-anchor-placement="top-bottom"
        data-aos-delay="500"
        className={styles.helpButton}
        onClick={(e) => setIsModalOpen(!isModalOpen)}
      >
        <Image
          className={styles.helpImage}
          src="/help.png"
          alt="Help"
          width={50}
          height={50}
        />
      </button>
      <Modal isActive={isModalOpen} onActiveChanged={setIsModalOpen}>
        <div className={styles.helpDialogContainer}>
          <div className={styles.costText}>
            Proposal costs{" "}
            <span className={styles.cost}>{PROPOSE_COST * 1000} mETH</span>
          </div>
          <div className={styles.costText}>
            Upvote costs{" "}
            <span className={styles.cost}>{UPVOTE_COST * 1000} mETH</span>
          </div>
          <div className={styles.costText}>
            Downvote costs{" "}
            <span className={styles.cost}>{DOWNVOTE_COST * 1000} mETH</span>
          </div>
          <CostBadge amount={UPVOTE_COST} network="ethereum">
            <div className={styles.example}>
              The costs are shown with a little coin, like this
            </div>
          </CostBadge>
          <div className={styles.text}>
            The winning proposal gets all the money. The money is distributed
            among the proposal creator and its upvotes. Proposal creator gets
            10x, the amount the upvotes get.
          </div>
          <div className={styles.text}>
            The poll runs until the poll owner does not stop it
          </div>
        </div>
      </Modal>
    </>
  );
}
