import React, { useState } from "react";
import { useStore } from "../store";

export default function Edit({ closeModal }) {
  const editTask = useStore((store) => store.editTask);
  const editCategory = useStore((store) => store.editCategory);

  const tasks = useStore((store) => store.tasks);
  const categories = useStore((store) => store.categories);

  const [inputOptions, setInputOptions] = useState({
    item: "item",
    radio: null,
    title: "",
  });

  function onChangeHandler(e) {
    const { value, name } = e.target;
    setInputOptions((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function keyupHandler(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      submitHandler();
    }
  }

  function displayItems() {
    const items = inputOptions.item === "item" ? [...tasks] : [...categories];
    return (
      <div className="modal-item-lists">
        {items.map((item) => {
          const currentCategory = item.category ? " -" + item.category : "";
          return (
            <label key={item.title + " -edit"}>
              <input
                type="radio"
                onChange={onChangeHandler}
                name="radio"
                value={item.title}
                checked={item.title === inputOptions.radio}
              />
              {item.title} <span>{currentCategory}</span>
            </label>
          );
        })}
      </div>
    );
  }

  function submitHandler() {
    const { item, radio, title } = inputOptions;
    if (radio) {
      item === "item" ? editTask(radio, title) : editCategory(radio, title);
    }
    closeModal();
  }

  return (
    <div className="modal modal-add" onKeyUp={keyupHandler}>
      <header>
        <p>Edit Items</p>
      </header>
      <div className="modal-input-box">
        {["item", "category"].map((item) => (
          <label key={item + " -item"}>
            <input
              type="radio"
              value={item}
              checked={inputOptions.item === item}
              name="item"
              onChange={onChangeHandler}
            />
            {item.charAt(0).toUpperCase() + item.substring(1, item.length)}
          </label>
        ))}
      </div>
      {displayItems()}
      <div className="modal-input-box text">
        <p>Rename</p>
        <input
          type="text"
          value={inputOptions.title}
          name="title"
          onChange={onChangeHandler}
        />
      </div>
      <div className="modal-btn-box">
        <button onClick={submitHandler}>SUBMIT</button>
        <button onClick={closeModal}>CLOSE</button>
      </div>
    </div>
  );
}
