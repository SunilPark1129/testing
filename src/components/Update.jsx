import React, { useState, useEffect } from "react";
import { useStore } from "../store";
import "./Update.css";

export default function Update() {
  const isLongtap = useStore((store) => store.isLongtap);
  const setLongtap = useStore((store) => store.setLongtap);
  const deleteTask = useStore((store) => store.deleteTask);
  const editTask = useStore((store) => store.editTask);
  const reNew = useStore((store) => store.reNew);
  const [text, setText] = useState("");

  function modalClose() {
    setLongtap(null);
  }

  useEffect(() => {
    if (isLongtap) {
      //   console.log("here?");
      document.body.style.overflow = "hidden";
    } else {
      //   console.log("no?");
      document.body.style.overflow = "auto";
    }
  }, [isLongtap]);

  return (
    <div className={`update-modal ${isLongtap && "actived"}`}>
      {/* <div>{isLongtap.title}</div> */}
      <div className="update-modal__box">
        <input
          type="text"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <button
          onClick={() => editTask(isLongtap.title, isLongtap.state, text)}
        >
          EDIT
        </button>
        <button onClick={() => reNew()}>renew</button>
        <button onClick={() => deleteTask(isLongtap)}>DELETE</button>
        <button onClick={modalClose}>CANCEL</button>
      </div>
      <div className="update-modal__close" onClick={modalClose}></div>
    </div>
  );
}
