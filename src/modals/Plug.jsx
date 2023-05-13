import React, { useState } from "react";
import { useStore } from "../store";

export default function Plug({ closeModal }) {
  const tasks = useStore((store) => store.tasks);
  const categories = useStore((store) => store.categories);
  const pluginCategory = useStore((store) => store.pluginCategory);

  const [inputOptions, setInputOptions] = useState("plug-in");
  const [checkItems, setCheckItems] = useState({});
  const [checkCategory, setCheckCategory] = useState(null);
  const [modalOpen, setModalOpen] = useState("item");

  function onChangeHandler(e) {
    const { value } = e.target;
    setInputOptions(value);
  }

  function checkChangeHandler(e) {
    const { value, checked } = e.target;
    if (modalOpen === "item") {
      setCheckItems((prev) => ({
        ...prev,
        [value]: checked,
      }));
    } else if (modalOpen === "category") {
      setCheckCategory(value);
    }
  }

  function modalClickHandler(e) {
    const { name } = e.target;
    setModalOpen(name);
  }

  function displayItems() {
    const items = modalOpen === "item" ? [...tasks] : [...categories];
    if (modalOpen) {
      return items.map((item) => {
        if (inputOptions === "plug-out") {
          if (item.category === null) return;
        }
        const isChecked =
          modalOpen === "item"
            ? checkItems[item.title] || false
            : checkCategory === item.title || false;

        const currentCategory =
          modalOpen === "item" && item.category ? " -" + item.category : "";
        return (
          <label key={item.title + " -plug"}>
            <input
              type={`${modalOpen === "item" ? "checkbox" : "radio"}`}
              onChange={checkChangeHandler}
              value={item.title}
              checked={isChecked}
            />
            {item.title} <span>{currentCategory}</span>
          </label>
        );
      });
    } else {
      return null;
    }
  }

  function submitHandler() {
    const transferItems = Object.keys(checkItems).filter(
      (item) => checkItems[item]
    );
    if (inputOptions === "plug-in") {
      if (transferItems.length !== 0 && checkCategory !== null) {
        pluginCategory(transferItems, checkCategory);
      }
    } else {
      if (transferItems.length !== 0) {
        pluginCategory(transferItems, null);
      }
    }
    closeModal();
  }

  return (
    <div className="modal modal-add">
      <div className="modal-input-box">
        {["plug-in", "plug-out"].map((item) => (
          <label key={item + " -item"}>
            <input
              type="radio"
              value={item}
              checked={inputOptions === item}
              onChange={onChangeHandler}
            />
            {item.charAt(0).toUpperCase() + item.substring(1, item.length)}
          </label>
        ))}
      </div>
      <div className="modal-box">
        <div>
          <button onClick={modalClickHandler} name="item">
            Select Items
          </button>
          <p>
            -
            {Object.keys(checkItems)
              .filter((item) => checkItems[item])
              .join(", ")}
          </p>
        </div>
        {inputOptions === "plug-in" ? (
          <div>
            <button onClick={modalClickHandler} name="category">
              Select Category
            </button>
            <p>-{checkCategory}</p>
          </div>
        ) : null}
      </div>
      <div className="modal-item-lists">{displayItems()}</div>
      <div className="modal-btn-box">
        <button onClick={submitHandler}>SUBMIT</button>
        <button onClick={closeModal}>CANCEL</button>
      </div>
    </div>
  );
}
