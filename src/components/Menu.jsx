import React, { useState, useEffect } from "react";
import Add from "../modals/Add";
import Delete from "../modals/Delete";
import Plug from "../modals/Plug";
import Edit from "../modals/Edit";

import "./Menu.css";

import { useStore } from "../store";

export default function Menu() {
  const reNew = useStore((store) => store.reNew);
  const reNewCate = useStore((store) => store.reNewCate);
  const [openModal, setOpenModal] = useState({ name: null });
  const tasks = useStore((store) => store.tasks);
  const categories = useStore((store) => store.categories);

  useEffect(() => {
    if (openModal.name) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [openModal]);

  function closeModal() {
    setOpenModal({ name: null });
  }

  function onClickHandler(e) {
    const { name } = e.target;
    setOpenModal({
      name: name,
    });
  }

  function modalHandler() {
    if (openModal.name === "add") {
      return <Add closeModal={closeModal} />;
    }

    if (openModal.name === "delete") {
      return <Delete closeModal={closeModal} />;
    }

    if (openModal.name === "edit") {
      return <Edit closeModal={closeModal} />;
    }

    if (openModal.name === "plug") {
      return <Plug closeModal={closeModal} />;
    }

    if (openModal.name === "check") {
      console.log(tasks);
      console.log(categories);
    }

    return null;
  }

  return (
    <div>
      <button
        onClick={() => {
          reNew();
        }}
      >
        renew
      </button>
      <button
        onClick={() => {
          reNewCate();
        }}
      >
        renewCate
      </button>
      <button name={"add"} onClick={onClickHandler}>
        ADD
      </button>
      <button name={"delete"} onClick={onClickHandler}>
        DELETE
      </button>
      <button name={"edit"} onClick={onClickHandler}>
        EDIT
      </button>
      <button name={"plug"} onClick={onClickHandler}>
        PLUG
      </button>
      <button name={"check"} onClick={onClickHandler}>
        CHECK
      </button>
      {openModal.name ? (
        <div className="bg-dark" onClick={closeModal}></div>
      ) : null}
      {modalHandler()}
    </div>
  );
}
