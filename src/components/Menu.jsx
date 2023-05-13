import React, { useState, useEffect } from "react";
import Add from "../modals/Add";
import Delete from "../modals/Delete";
import Plug from "../modals/Plug";
import Edit from "../modals/Edit";

import "./Menu.css";

import { useStore } from "../store";

import imgAdd from "../assets/plus.svg";
import add1 from "../assets/plus-square.svg";
import add2 from "../assets/plus-circle.svg";

import imgBox from "../assets/box.svg";

import imgMinus from "../assets/minus.svg";
import minus1 from "../assets/minus-square.svg";
import minus2 from "../assets/minus-circle.svg";

import imgBar from "../assets/align-justify.svg";
import trash from "../assets/trash-2.svg";

import imgEdit from "../assets/edit-2.svg";

import imgHelp from "../assets/help-circle.svg";

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
    <div className="menu">
      <div className="menu-lists">
        <img
          src={imgAdd}
          alt="add"
          name={"add"}
          onClick={onClickHandler}
          title="add items"
        />
        <img
          src={imgMinus}
          alt="delete"
          name={"delete"}
          onClick={onClickHandler}
          title="delete items"
        />
        <img
          src={imgEdit}
          alt="edit"
          name={"edit"}
          onClick={onClickHandler}
          title="edit items"
        />
        <img
          src={imgBox}
          alt="plug"
          name={"plug"}
          onClick={onClickHandler}
          title="set categories"
        />
        <img src={imgHelp} alt="help" name="help" title="learn how to use" />
        <img
          src={imgBar}
          name={"home"}
          alt="home menu"
          title="go to homepage"
        />
      </div>
      {openModal.name ? (
        <div className="bg-dark" onClick={closeModal}></div>
      ) : null}
      {modalHandler()}
    </div>
  );
}
