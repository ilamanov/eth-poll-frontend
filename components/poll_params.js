import React, { useState } from "react";
import styles from "../styles/components/poll_params.module.css";
import Identity from "../components/identity";
import About from "../components/about";
import { areAddressesTheSame } from "../utils/contract";

export default function PollParams({
  isActive,
  setIsActive,
  pollOwnerAddress,
  onSubmit,
  submitText,
  initialValues,
}) {
  return (
    <div className={"modal" + (isActive ? " is-active" : "")}>
      <div
        className="modal-background"
        onClick={(e) => {
          e.stopPropagation();
          setIsActive(false);
        }}
      ></div>
      <div className={"modal-content"}>
        <ModalContent
          pollOwnerAddress={pollOwnerAddress}
          onSubmit={onSubmit}
          submitText={submitText}
          initialValues={initialValues}
        />
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={(e) => {
          e.stopPropagation();
          setIsActive(false);
        }}
      ></button>
    </div>
  );
}

function ModalContent({
  pollOwnerAddress,
  onSubmit,
  submitText,
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

  const [isMining, setMining] = useState(false);

  const doesOwnPoll =
    userAddress &&
    pollOwnerAddress &&
    areAddressesTheSame(userAddress, pollOwnerAddress);

  function submit() {
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
    if (error) {
      return;
    }

    setMining(true);
    onSubmit(avatarUrl, title, about);
  }

  return (
    <div className={styles.modalContainer}>
      <Identity onIdentityChanged={(address) => setUserAddress(address)} />
      {doesOwnPoll && (
        <>
          <div style={{ marginTop: "2.5em" }} />
          <div className="field">
            <label className="label">Avatar URL</label>
            <div className="control">
              <input
                className={"input" + (avatarError ? " is-danger" : "")}
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
                className={"input" + (titleError ? " is-danger" : "")}
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
                className={"input" + (aboutError ? " is-danger" : "")}
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
            <button
              type="submit"
              className={"button is-orange" + (isMining ? " is-loading" : "")}
              onClick={submit}
            >
              {submitText}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
