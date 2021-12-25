import React, { useState } from "react";
import styles from "../styles/components/poll_params.module.css";
import Identity, { IdentityView } from "../components/identity";
import About from "../components/about";
import { areAddressesTheSame } from "../utils/contract";
import CostBadge from "./ui/cost_badge";
import BlockchainInteractionButton from "./blockchain_interaction_button";

export default function PollParams({
  pollOwnerAddress,
  submitText,
  startSubmit,
  onSubmitted,
  initialValues,
}) {
  const [userAddress, setUserAddress] = useState("");

  const orDefault = (key) => {
    return initialValues && initialValues[key] ? initialValues[key] : "";
  };

  const [avatarUrl, setAvatarUrl] = useState(orDefault("avatarUrl"));
  const [title, setTitle] = useState(orDefault("title"));
  const [about, setAbout] = useState(orDefault("about"));

  const [avatarError, setAvatarError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [aboutError, setAboutError] = useState(false);

  const doesOwnPoll =
    userAddress &&
    pollOwnerAddress &&
    areAddressesTheSame(userAddress, pollOwnerAddress);

  const validate = () => {
    let error = false;
    if (avatarUrl === "") {
      setAvatarError(true);
      error = true;
    }
    if (title === "") {
      setTitleError(true);
      error = true;
    }
    if (about === "") {
      setAboutError(true);
      error = true;
    }
    return !error;
  };

  return (
    <div className={styles.container}>
      <Identity onIdentityChanged={(address) => setUserAddress(address)} />
      {doesOwnPoll ? (
        <>
          <div style={{ marginTop: "2.5em" }} />
          <div className="field">
            <label className="label">Avatar URL</label>
            <div className="control">
              <input
                className={
                  "input " + styles.input + (avatarError ? " is-danger" : "")
                }
                type="text"
                placeholder="https://my-avatar.com/png/jpg"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
              />
            </div>
            {avatarError && (
              <p className="help is-danger">Avatar URL can not be empty</p>
            )}
          </div>
          <div style={{ marginTop: "1em" }} />
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                className={
                  "input " + styles.input + (titleError ? " is-danger" : "")
                }
                type="text"
                placeholder="👋 Hey, this is Nazar"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            {titleError && (
              <p className="help is-danger">Title can not be empty</p>
            )}
          </div>
          <div style={{ marginTop: "1em" }} />
          <div className="field">
            <label className="label">About</label>
            <div className="control">
              <input
                className={
                  "input " + styles.input + (aboutError ? " is-danger" : "")
                }
                type="text"
                placeholder="Let me know what web3 concept you would like me to explain!"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>
            {aboutError && (
              <p className="help is-danger">About can not be empty</p>
            )}
          </div>
          <div style={{ marginTop: "1.5em" }} />
          <About
            avatarUrl={avatarUrl}
            title={title}
            about={about}
            address={pollOwnerAddress}
            isAddressMine={doesOwnPoll}
          />
          <div style={{ marginTop: "1.5em" }} />
          <div>
            <CostBadge network="ethereum">
              <BlockchainInteractionButton
                type="submit"
                className="button is-green"
                wallet="metamask"
                shouldStartOnClick={validate}
                startTransactionOnClick={() =>
                  startSubmit(avatarUrl, title, about)
                }
                onTransactionConfirmed={onSubmitted}
              >
                {submitText}
              </BlockchainInteractionButton>
            </CostBadge>
          </div>
        </>
      ) : userAddress !== "" ? (
        <div className={styles.helperText}>
          You need to connect with the address{" "}
          <IdentityView
            address={pollOwnerAddress}
            isAddressMine={doesOwnPoll}
          />{" "}
          to create a poll on this page
        </div>
      ) : null}
    </div>
  );
}
