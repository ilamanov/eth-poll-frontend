import React, { useState } from "react";
import Identity, { IdentityView } from "../components/identity";
import About from "../components/about";
import styles from "../styles/components/poll_not_active.module.css";

export default function PollNotActive({
  pollOwnerAddress,
  areAddressesTheSame,
  createPoll,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <div className={styles.text}>
        There is no poll at the provided address{" "}
        <IdentityView address={pollOwnerAddress} mine={false} />
      </div>
      <div className={styles.text}>
        If you own this address, you can create your poll.
      </div>
      <div className={styles.createPollButtonContainer}>
        <button
          className="button is-green"
          onClick={(e) => setIsModalOpen(!isModalOpen)}
        >
          Create Poll
        </button>
      </div>
      <div className={"modal" + (isModalOpen ? " is-active" : "")}>
        <div
          className="modal-background"
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(false);
          }}
        ></div>
        <div className={"modal-content " + styles.content}>
          <CreatePoll
            pollOwnerAddress={pollOwnerAddress}
            areAddressesTheSame={areAddressesTheSame}
            createPoll={createPoll}
          />
        </div>
        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(false);
          }}
        ></button>
      </div>
    </div>
  );
}

function CreatePoll({ pollOwnerAddress, areAddressesTheSame, createPoll }) {
  const [userAddress, setUserAddress] = useState("");

  const [avatarUrl, setAvatarUrl] = useState("");
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");

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
    createPoll(avatarUrl, title, about);
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
          />
          <div style={{ marginTop: "1.5em" }} />
          <div className={styles.submitButtonContainer}>
            <button
              type="submit"
              className={"button is-orange" + (isMining ? " is-loading" : "")}
              onClick={submit}
            >
              Submit Poll using MetaMask
            </button>
          </div>
        </>
      )}
    </div>
  );
}
