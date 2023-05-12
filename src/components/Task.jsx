import classNames from "classnames";
import "./Task.css";
import { useStore } from "../store";
import { useState, useRef, useEffect } from "react";
import Ongoing from "./Ongoing";
let tapTimer;
export default function Task({ title, state, currentIdx }) {
  const fullState = ["PLANNED", "ONGOING", "DONE"];
  const task = useStore((store) =>
    store.tasks.find((task) => task.title === title)
  );

  const moveTask = useStore((store) => store.moveTask);
  const optionOpenTask = useStore((store) => store.optionOpenTask);
  const optionOpen = useStore((store) => store.optionOpen);

  const [taskStyle, setTaskStyle] = useState({});
  const [pos, setPos] = useState(0);

  const [hasDragged, setDragged] = useState(false);
  const [timer, setTimer] = useState(false);

  const taskRef = useRef(null);

  function cancelTimer() {
    clearTimeout(tapTimer);
  }

  function detectDouble() {
    if (timer) {
      console.log("db");
      clearTimeout(tapTimer);
      optionOpenTask(title);
    }

    if (!timer) {
      setTimer(true);
      tapTimer = setTimeout(() => {
        console.log("canceled");
        optionOpenTask(null);
        setTimer(false);
      }, 500);
    }
  }

  function dragStart(e) {
    e.preventDefault();
    setDragged(true);
    detectDouble();
  }
  function drag(e) {
    if (hasDragged) {
      document.body.style.overflow = "hidden";
      const bg =
        (pos < 0 && currentIdx === 0) || (pos > 0 && currentIdx === 2)
          ? "#f88c8c"
          : `#fff`;
      const setbg = `rgb(${(Math.abs(pos) * -1) / 5 + 255}, 255, 255)`;
      setPos((prev) => prev + e.movementX);
      setTaskStyle({
        left: pos,
        background: bg,
        transitionDuration: "0s",
      });
    }
    e.stopPropagation();
  }
  function dropped(e) {
    document.body.style.overflow = "auto";
    setDragged(false);
    if (pos > 150 && currentIdx !== 2) {
      moveTask(title, fullState[currentIdx + 1]);
    }

    if (pos < -150 && currentIdx !== 0) {
      moveTask(title, fullState[currentIdx - 1]);
    }

    resetPos();
  }
  function resetPos() {
    setPos(0);
    setTaskStyle({
      left: 0,
      transitionDuration: "1s",
    });
  }
  return (
    <div className="task-box">
      <div
        ref={taskRef}
        className="task"
        onPointerDown={(e) => {
          dragStart(e);
        }}
        onPointerMove={(e) => {
          drag(e);
        }}
        onPointerUp={(e) => {
          dropped(e);
        }}
        style={taskStyle}
      >
        <div>{task.title}</div>
      </div>
      <div
        style={{
          height: optionOpen === title ? "2rem" : 0,
          opacity: optionOpen === title ? 1 : 0,
          pointerEvents: optionOpen === title ? "auto" : "none",
          transitionProperty: "height, opacity",
          transitionDuration: ".3s",
        }}
      >
        <button
          onClick={() => {
            console.log("here");
            setTimer(false);
            optionOpenTask(null);
          }}
        >
          Hello
        </button>
      </div>
    </div>
  );
}
