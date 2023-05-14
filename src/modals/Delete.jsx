import React, { useState } from "react";
import { useStore } from "../store";

export default function Delete({ closeModal }) {
  const deleteTask = useStore((store) => store.deleteTask);
  const deleteCategory = useStore((store) => store.deleteCategory);
  const tasks = useStore((store) => store.tasks);
  const categories = useStore((store) => store.categories);
  const [checkItems, setCheckItems] = useState({});

  const [inputOptions, setInputOptions] = useState({
    item: "item",
    state: "planned",
    title: "",
    category: null,
  });

  // useEffect(() => {
  //   console.log(checkItems);
  // }, [checkItems]);

  function onChangeHandler(e) {
    const { value, name } = e.target;
    setInputOptions({
      [name]: value,
    });
    setCheckItems({});
  }

  function checkChangeHandler(e) {
    const { value, checked } = e.target;
    setCheckItems((prev) => ({
      ...prev,
      [value]: checked,
    }));
  }

  function displayItems() {
    const items = inputOptions.item === "item" ? [...tasks] : [...categories];
    return (
      <div className="modal-item-lists">
        {items.map((item) => {
          const currentCategory = item.category ? " -" + item.category : "";
          return (
            <label key={item.title + " -delete"}>
              <input
                type="checkbox"
                onChange={checkChangeHandler}
                value={item.title}
              />
              {item.title} <span>{currentCategory}</span>
            </label>
          );
        })}
      </div>
    );
  }

  function submitHandler() {
    const filteredItems = Object.keys(checkItems).filter(
      (item) => checkItems[item]
    );
    if (filteredItems.length !== 0) {
      inputOptions.item === "item"
        ? deleteTask(filteredItems)
        : deleteCategory(filteredItems);
    }
    closeModal();
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
        <p>Delete Items</p>
      </header>
      <div className="modal-input-box">
        <label>
          <input
            type="radio"
            value={"item"}
            checked={inputOptions.item === "item"}
            name="item"
            onChange={onChangeHandler}
          />
          Item
        </label>
        <label>
          <input
            type="radio"
            value={"category"}
            checked={inputOptions.item === "category"}
            name="item"
            onChange={onChangeHandler}
          />
          Category
        </label>
      </div>
      {displayItems()}
      <div className="modal-btn-box">
        <button onClick={submitHandler}>SUBMIT</button>
        <button onClick={closeModal}>CLOSE</button>
      </div>
    </div>
  );
}
