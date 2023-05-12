import classNames from "classnames";
import "./Task.css";
import { useStore } from "../store";
import { useState, useRef, useEffect } from "react";
import Ongoing from "./Ongoing";
let longtapTimer;
export default function Task({ title, state, currentIdx }) {
  const fullState = ["PLANNED", "ONGOING", "DONE"];
  const task = useStore((store) =>
    store.tasks.find((task) => task.title === title)
  );
  const refAddress = useStore((store) => store.refAddress);
  const setDroppable = useStore((store) => store.setDroppable);
  const setDragging = useStore((store) => store.setDragging);
  const setLongtap = useStore((store) => store.setLongtap);
  const moveTask = useStore((store) => store.moveTask);
  const dragPos = useStore((store) => store.dargPost);
  const setDragPos = useStore((store) => store.setDargPost);

  const [taskStyle, setTaskStyle] = useState({});
  const [hasAction, setAction] = useState(true);
  const [pos, setPos] = useState(0);

  const [hasDragged, setDragged] = useState(false);

  useEffect(() => {
    if (!hasAction) {
      longtapTimer = setTimeout(() => {
        setAction(true);
        setLongtap({ title: task.title, state: state });
      }, 500);
    }
    if (hasAction) {
      clearTimeout(longtapTimer);
    }
    console.log(hasAction);
  }, [hasAction]);

  function vibFn() {
    navigator.vibrate(50);
  }

  const taskRef = useRef(null);
  function dragStart(e) {
    vibFn();
    // setAction(false);
    setDragged(true);
  }
  function drag(e) {
    if (hasDragged) {
      document.body.style.overflow = "hidden";
      // setDragging(true);
      setAction(true);
      // const a = { color: #a1d8a6 };
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
    setAction(true);
    document.body.style.overflow = "auto";
    setDragged(false);

    if (pos > 150 && currentIdx !== 2) {
      console.log("right");
      moveTask(title, fullState[currentIdx + 1]);
    }

    if (pos < -150 && currentIdx !== 0) {
      console.log("left");
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
      {/* <Ongoing /> */}
    </div>
  );
}
