import React, { useEffect, useState } from "react";
import { useStore } from "../store";

export default function Add({ closeModal }) {
  const addTask = useStore((store) => store.addTask);
  const addCategoryTask = useStore((store) => store.addCategoryTask);
  const tasks = useStore((store) => store.tasks.map((item) => item.title));
  const categories = useStore((store) =>
    store.categories.map((item) => item.title)
  );

  const [inputOptions, setInputOptions] = useState({
    item: "item",
    state: "planned",
    title: "",
    category: null,
  });

  function onChangeHandler(e) {
    const { value, name } = e.target;

    setInputOptions((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function submitHandler() {
    const { item, state, title, category } = inputOptions;
    if (title.trim !== "") {
      if (item === "item") {
        if (tasks.includes(title)) return;
        addTask(title, state, category);
      }
      if (item === "category") {
        if (categories.includes(title)) return;
        addCategoryTask(title);
      }
    }
    closeModal();
  }

  return (
    <div className="modal modal-add">
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
      {inputOptions.item === "item" ? (
        <div className="modal-input-box">
          {["planned", "pending", "completed"].map((item) => (
            <label key={item + " -state"}>
              <input
                type="radio"
                value={item}
                name="state"
                checked={inputOptions.state === item}
                onChange={onChangeHandler}
              />
              {item.charAt(0).toUpperCase() + item.substring(1, item.length)}
            </label>
          ))}
        </div>
      ) : null}
      {/* <div className="modal-input-box">
        <div>N</div>
        <button>Set Category</button>
        <p>-</p>
      </div> */}
      <div className="modal-input-box">
        <label>
          Title
          <input
            type="text"
            value={inputOptions.title}
            name="title"
            onChange={onChangeHandler}
          />
        </label>
      </div>
      <div className="modal-btn-box">
        <button onClick={submitHandler}>SUBMIT</button>
        <button onClick={closeModal}>CANCEL</button>
      </div>
    </div>
  );
}
