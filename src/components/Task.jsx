import "./Task.css";
import { useStore } from "../store";
import { useState } from "react";

export default function Task({ title, state, currentIdx, isItem, order }) {
  const fullState = ["planned", "pending", "completed"];
  const task = useStore((store) =>
    store.tasks.find((task) => task.title === title)
  );

  const moveTask = useStore((store) => store.moveTask);
  const optionOpen = useStore((store) => store.optionOpen);
  const [taskStyle, setTaskStyle] = useState({});
  const [pos, setPos] = useState(0);
  const [borderColor, setBorderColor] = useState(null);
  const [hasDragged, setDragged] = useState(false);

  function dragStart(e) {
    e.preventDefault();
    setDragged(true);
  }
  function drag(e) {
    if (hasDragged) {
      document.body.style.overflow = "hidden";
      const taskBg =
        (pos < 0 && currentIdx === 0) || (pos > 0 && currentIdx === 2)
          ? "#6161618b"
          : (pos < -150 && currentIdx !== 0) || (pos > 150 && currentIdx !== 2)
          ? "#ffffffce"
          : "#c9c9c98f";
      setPos((prev) => prev + e.movementX);
      // setBorderColor("transparent");
      setTaskStyle({
        left: pos,
        background: taskBg,
        cursor: "grabbing",
        transitionDuration: "0s",
      });
      if ((pos > 50 || pos < -50) && optionOpen) {
      }
    }
    e.stopPropagation();
  }
  function dragLeave() {
    document.body.style.overflow = "auto";
    // setBorderColor("rgba(26, 26, 26, 0.562)");
    setDragged(false);
    resetPos();
  }
  function dropped() {
    document.body.style.overflow = "auto";
    setDragged(false);
    if (pos > 150 && currentIdx !== 2) {
      moveTask(title, fullState[currentIdx + 1]);
    }

    if (pos < -150 && currentIdx !== 0) {
      moveTask(title, fullState[currentIdx - 1]);
    }
    // setBorderColor("rgba(26, 26, 26, 0.562)");
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
    <div className="task-box" style={{ order: order }}>
      <div
        className={`task`}
        onPointerDown={dragStart}
        onPointerMove={drag}
        onPointerLeave={dragLeave}
        onPointerUp={dropped}
        style={taskStyle}
      >
        <div>{title}</div>
      </div>
    </div>
  );
}
