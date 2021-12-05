import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "../styles/Poll.module.css";
import {
  getPoll,
  createPoll,
  editPoll,
  areAddressesTheSame,
} from "../utils/contract";
import Identity from "../components/identity";
import About from "../components/about";
import Propose from "../components/propose";
import TwitterFooter from "../components/twitter_footer";
import PollNotActive from "../components/poll_not_active";

export default function Poll() {
  const router = useRouter();
  const pollOwnerAddress = router.query.address;

  const [isPollActive, setIsPollActive] = useState(undefined);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");

  const [userAddress, setUserAddress] = useState("");

  const doesOwnPoll =
    userAddress &&
    pollOwnerAddress &&
    areAddressesTheSame(userAddress, pollOwnerAddress);

  const checkIfPollIsActive = async () => {
    const poll = await getPoll(pollOwnerAddress);
    setAvatarUrl(poll.avatarUrl);
    setTitle(poll.title);
    setAbout(poll.bio);
    setIsPollActive(poll.isActive);
  };

  useEffect(() => {
    checkIfPollIsActive();
  }, [pollOwnerAddress]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Ξ ETH Poll</title>
        <meta name="description" content="Vote with Ethereum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isPollActive ? (
        <>
          <header className={styles.header}>
            <div className={styles.navBar}>
              <Identity
                onIdentityChanged={(address) => setUserAddress(address)}
              />
            </div>
            <About
              avatarUrl={avatarUrl}
              title={title}
              about={about}
              address={pollOwnerAddress}
              isAddressMine={doesOwnPoll}
              editable={{
                value: doesOwnPoll,
                pollOwnerAddress: pollOwnerAddress,
                onEdit: async (avatarUrl, title, about) => {
                  await editPoll(avatarUrl, title, about);
                  router.reload(window.location.pathname);
                },
              }}
            />
            <Propose />
          </header>

          <main className={styles.main}></main>
        </>
      ) : isPollActive === undefined ? (
        <>
          <div>{/* to make flex-space-between happy */}</div>
          <div className={styles.loading}>Loading...</div>
        </>
      ) : (
        <>
          <div>{/* to make flex-space-between happy */}</div>
          <PollNotActive
            pollOwnerAddress={pollOwnerAddress}
            createPoll={async (avatarUrl, title, about) => {
              await createPoll(avatarUrl, title, about);
              router.reload(window.location.pathname);
            }}
          />
        </>
      )}

      <TwitterFooter />
    </div>
  );
}
