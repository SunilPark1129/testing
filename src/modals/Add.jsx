import React, { useEffect, useRef, useState } from "react";
import { useStore } from "../store";

export default function Add({ closeModal }) {
  const addTask = useStore((store) => store.addTask);
  const addCategoryTask = useStore((store) => store.addCategoryTask);
  const tasks = useStore((store) => store.tasks.map((item) => item.title));
  const categories = useStore((store) =>
    store.categories.map((item) => item.title)
  );
  const [status, setStatus] = useState(null);
  const typeRef = useRef(null);
  const initVal = { item: "item", state: "planned", title: "", category: null };

  useEffect(() => {
    typeRef.current.focus();
  }, []);

  const [inputOptions, setInputOptions] = useState(initVal);

  function onChangeHandler(e) {
    const { value, name } = e.target;

    setInputOptions((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function submitHandler() {
    const { item, state, title, category } = inputOptions;
    if (title.trim() !== "") {
      console.log(title);
      if (item === "item") {
        if (tasks.includes(title)) {
          setStatus(false);
          return;
        }
        addTask(title, state, category);
      }
      if (item === "category") {
        if (categories.includes(title)) {
          setStatus(false);
          return;
        }
        addCategoryTask(title);
      }
      setStatus(true);
      setInputOptions((prev) => ({
        ...prev,
        title: "",
      }));
      typeRef.current.focus();
    }
  }

  function keyupHandler(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      submitHandler();
    }
  }

  return (
    <div className="modal modal-add" onKeyUp={keyupHandler}>
      <header>
        <p>Add Items</p>
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
      <p>
        Status -{" "}
        <span
          style={{
            color: `${status ? "green" : status === null ? "black" : "red"}`,
          }}
        >
          {status
            ? "Item has been added."
            : status === null
            ? "Waiting for a submit."
            : "Dupplicated title is not acceptable."}
        </span>
      </p>
      <div className="modal-input-box text">
        <label>
          Title
          <input
            type="text"
            value={inputOptions.title}
            name="title"
            ref={typeRef}
            onChange={onChangeHandler}
          />
        </label>
      </div>
      <div className="modal-btn-box">
        <button onClick={submitHandler}>SUBMIT</button>
        <button onClick={closeModal}>CLOSE</button>
      </div>
    </div>
  );
}
