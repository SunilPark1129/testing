import classNames from "classnames";
import "./Task.css";
import { useStore } from "../store";
import { useState, useRef, useEffect } from "react";

export default function Task({ title, state }) {
  const task = useStore((store) =>
    store.tasks.find((task) => task.title === title)
  );
  const refAddress = useStore((store) => store.refAddress);
  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const deleteTask = useStore((store) => store.deleteTask);
  const setDroppable = useStore((store) => store.setDroppable);
  const setDragging = useStore((store) => store.setDragging);
  const moveTask = useStore((store) => store.moveTask);
  const draggedTask = useStore((store) => store.draggedTask);

  const [taskStyle, setTaskStyle] = useState({});

  const taskRef = useRef(null);
  function dragStart(e) {
    setDragging(true);
  }
  function drag(e) {
    document.body.style.overflow = "hidden";
    // move task with mouse pointer
    setTaskStyle({
      position: "absolute",
      left: e.changedTouches[0].clientX - taskRef.current.clientWidth / 2,
      top: e.changedTouches[0].pageY - taskRef.current.clientHeight / 2,
    });

    const curPosX = e.changedTouches[0].clientX;
    const curPosY = e.changedTouches[0].clientY;
    if (
      refAddress.plannedRef[0].top < curPosY &&
      curPosY < refAddress.plannedRef[0].bottom &&
      window.innerWidth - refAddress.plannedRef[0].width < curPosX
    ) {
      setDroppable("PLANNED");
    } else if (
      refAddress.ongoingRef[0].top < curPosY &&
      curPosY < refAddress.ongoingRef[0].bottom &&
      window.innerWidth - refAddress.ongoingRef[0].width < curPosX
    ) {
      setDroppable("ONGOING");
    } else if (
      refAddress.doneRef[0].top < curPosY &&
      curPosY < refAddress.doneRef[0].bottom &&
      window.innerWidth - refAddress.doneRef[0].width < curPosX
    ) {
      setDroppable("DONE");
    } else {
      setDroppable(null);
    }
  }
  function dropped(e) {
    document.body.style.overflow = "auto";
    const curPosX = e.changedTouches[0].clientX;
    const curPosY = e.changedTouches[0].clientY;
    Object.values(refAddress).forEach((items) => {
      const item = items[0];
      if (
        item.top < curPosY &&
        curPosY < item.bottom &&
        window.innerWidth - item.width < curPosX
      ) {
        if (state === item.state) return;
        moveTask(task.title, item.state);
      }
    });
    setDraggedTask(null);
    setDroppable(null);
    setTaskStyle({});
    setDragging(false);
  }
  return (
    <div
      ref={taskRef}
      className="task"
      draggable
      onDragStart={() => {
        setDraggedTask(task.title);
      }}
      onTouchStart={dragStart}
      onTouchMove={drag}
      onTouchEnd={dropped}
      style={taskStyle}
    >
      <div>{task.title}</div>
      <div className="bottomWrapper">
        <div>
          <button onClick={() => deleteTask(task.title)}>Remove</button>
        </div>
        <div className={classNames("status", task.state)}>{task.state}</div>
      </div>
    </div>
  );
}
