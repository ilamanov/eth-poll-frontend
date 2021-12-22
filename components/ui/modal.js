import React from "react";

export default function Modal({ isActive, onActiveChanged, children }) {
  return (
    <div className={"modal" + (isActive ? " is-active" : "")}>
      <div
        className="modal-background"
        onClick={(e) => {
          e.stopPropagation();
          onActiveChanged(false);
        }}
      ></div>
      <div className={"modal-content"}>{children}</div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={(e) => {
          e.stopPropagation();
          onActiveChanged(false);
        }}
      ></button>
    </div>
  );
}
