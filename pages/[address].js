import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "../styles/Poll.module.css";
import {
  getPollData,
  submitProposal,
  upvote,
  downvote,
  areAddressesTheSame,
} from "../utils/contract";
import Identity from "../components/identity";
import About from "../components/about";
import Propose from "../components/propose";
import TwitterFooter from "../components/twitter_footer";
import PollNotActive from "../components/poll_not_active";
import ProposalList from "../components/proposal_list";

export default function Poll({ pollData }) {
  const router = useRouter();
  const [userAddress, setUserAddress] = useState("");

  const doesOwnPoll =
    userAddress &&
    pollData.ownerAddress &&
    areAddressesTheSame(userAddress, pollData.ownerAddress);

  function reload() {
    router.reload(window.location.pathname);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Ξ ETH Poll</title>
        <meta name="description" content="Vote with Ethereum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {pollData.isActive ? (
        <div>
          <header className={styles.header}>
            <div className={styles.navBar}>
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
            />
            <Propose
              pollOwnerAddress={pollData.ownerAddress}
              onProposalSubmitted={reload}
            />
          </header>

          <main className={styles.main}>
            <ProposalList
              proposals={pollData.proposals}
              userAddress={userAddress}
              upvote={async (proposalIndex) => {
                await upvote(pollData.ownerAddress, proposalIndex);
                router.reload(window.location.pathname);
              }}
              downvote={async (proposalIndex) => {
                await downvote(pollData.ownerAddress, proposalIndex);
                router.reload(window.location.pathname);
              }}
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

      <TwitterFooter />
    </div>
  );
}

export async function getServerSideProps({ params }) {
  return { props: { pollData: await getPollData(params.address) } };
}
