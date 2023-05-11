import { useState } from "react";
import { useStore } from "../store";
import classNames from "classnames";
import "./Column.css";
import Task from "./Task";

export default function Column({ state, currentIdx }) {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  const tasks = useStore((store) => {
    return store.tasks.filter((task) => task.state === state);
  });

  const allTasks = useStore((store) => {
    console.log(store.tasks);
    return store.tasks.map((task) => task.title);
  });

  const addTask = useStore((store) => store.addTask);

  return (
    <div className={"column"}>
      <div className="titleWrapper">
        <p>{state}</p>
        <button onClick={() => setOpen(true)}>Add</button>
      </div>
      {tasks.map((task) => {
        return (
          <Task
            title={task.title}
            key={task.title}
            state={state}
            currentIdx={currentIdx}
          />
        );
      })}
      {open && (
        <div className="Modal">
          <div className="modalContent">
            <input onChange={(e) => setText(e.target.value)} value={text} />
            <button
              onClick={() => {
                if (allTasks.includes(text)) return;
                addTask(text, state);
                setText("");
                setOpen(false);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
