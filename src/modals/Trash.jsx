import React from "react";
import { useStore } from "../store";
export default function Trash({ closeModal }) {
  const trashData = useStore((store) => store.trashData);
  function submitHandler() {
    trashData();
    closeModal();
  }
  return (
    <div className="modal modal-add">
      <header>
        <p>Reset All</p>
      </header>
      <div className="modal__trash">
        <p>
          Do you really want to <span>delete</span> all datas?
        </p>
        <p>
          Press <span>YES</span> to delete all tasks.
        </p>
      </div>
      <div className="modal-btn-box">
        <button onClick={submitHandler}>YES</button>
        <button onClick={closeModal}>NO</button>
      </div>
    </div>
  );
}
