import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "../styles/Poll.module.scss";
import { getPollData, areAddressesTheSame } from "../utils/contract";
import Identity from "../components/identity";
import About from "../components/about";
import Propose from "../components/propose";
import TwitterFooter from "../components/ui/twitter_footer";
import PollNotActive from "../components/poll_not_active";
import ProposalList from "../components/proposal_list";
import WavingHand from "../components/ui/waving_hand";
import HelpButton from "../components/ui/help_button";

export default function Poll({ pollData }) {
  const router = useRouter();
  const [userAddress, setUserAddress] = useState("");

  const doesOwnPoll =
    userAddress &&
    pollData.ownerAddress &&
    areAddressesTheSame(userAddress, pollData.ownerAddress);

  const cycleCutoff =
    pollData.cycleCutoffs.length > 0
      ? pollData.cycleCutoffs[pollData.cycleCutoffs.length - 1]
      : 0;
  const doesCycleHaveProposals = pollData.proposals.length > cycleCutoff;

  function reload() {
    router.reload(window.location.pathname);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>DePoll</title>
        <meta name="description" content="Vote with Ethereum or Solana" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {pollData.isActive ? (
        <div>
          <header className={styles.header}>
            <div className={styles.navBar}>
              <div>
                <div className={styles.logo}>
                  <WavingHand />
                </div>
                <div className={styles.depoll}>DePoll</div>
              </div>
              <Identity
                onIdentityChanged={(address) => setUserAddress(address)}
              />
            </div>
            <About
              avatarUrl={pollData.avatarUrl}
              title={pollData.title}
              about={pollData.about}
              address={pollData.ownerAddress}
              isAddressMine={doesOwnPoll}
              editable={{
                value: doesOwnPoll,
                pollOwnerAddress: pollData.ownerAddress,
                onPollEdited: reload,
              }}
              endable={{
                value: doesOwnPoll && doesCycleHaveProposals,
                onEnded: reload,
              }}
            />
            <Propose
              pollOwnerAddress={pollData.ownerAddress}
              onProposalSubmitted={reload}
            />
          </header>

          <main className={styles.main}>
            <ProposalList
              proposals={pollData.proposals.reverse()}
              newProposalsCutoffIndex={pollData.proposals.length - cycleCutoff}
              userAddress={userAddress}
              pollOwnerAddress={pollData.ownerAddress}
              onUpvoted={reload}
              onDownvoted={reload}
            />
          </main>
        </div>
      ) : pollData.isActive === undefined ? (
        <>
          <div>{/* to make flex-space-between happy */}</div>
          <div className={styles.loading}>Loading...</div>
        </>
      ) : (
        <>
          <div>{/* to make flex-space-between happy */}</div>
          <PollNotActive
            pollOwnerAddress={pollData.ownerAddress}
            onPollCreated={reload}
          />
        </>
      )}

      <footer className={styles.footer}>
        <HelpButton />
        <TwitterFooter />
      </footer>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  return { props: { pollData: await getPollData(params.address) } };
}
