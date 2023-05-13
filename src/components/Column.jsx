import { useState, useEffect } from "react";
import { useStore } from "../store";
import "./Column.css";
import Task from "./Task";

export default function Column({ state, currentIdx, bg }) {
  const tasks = useStore((store) => {
    let temp = {};
    [...store.tasks].forEach((item) => {
      if (state === item.state) {
        if (item.category in temp) {
          temp = { ...temp, [item.category]: [...temp[item.category], item] };
        } else {
          temp = { ...temp, [item.category]: [item] };
        }
      }
    });
    return temp;
  });

  const orders = useStore((store) => {
    let orders = {};
    [...store.categories].forEach((item, idx) => {
      orders = { ...orders, [item.title]: idx };
    });
    return orders;
  });

  return (
    <div className={"column"} style={{ backgroundColor: bg }}>
      <div className="dot"></div>
      <div className="titleWrapper">
        <p>{state.toUpperCase()}</p>
      </div>
      {Object.entries(tasks).map(([category, value]) => {
        if (category !== "null") {
          return (
            <div
              className="category-box"
              key={category + " -category"}
              style={{ order: orders[category] }}
            >
              <p>{category}</p>
              <div className="dot" style={{ backgroundColor: bg }}></div>
              {value.map((task) => {
                return (
                  <Task
                    title={task.title}
                    key={task.title + " -item"}
                    state={state}
                    currentIdx={currentIdx}
                    isItem={true}
                  />
                );
              })}
            </div>
          );
        } else {
          return value.map((task) => {
            return (
              <Task
                title={task.title}
                key={task.title + " -item"}
                state={state}
                currentIdx={currentIdx}
                isItem={true}
                order={999}
              />
            );
          });
        }
      })}
    </div>
  );
}
