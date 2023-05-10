import classNames from "classnames";
import "./Task.css";
import { useStore } from "../store";
import { useState, useRef } from "react";

export default function Task({ title }) {
  const task = useStore((store) =>
    store.tasks.find((task) => task.title === title)
  );
  const refAddress = useStore((store) => store.refAddress);
  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const deleteTask = useStore((store) => store.deleteTask);

  const [isDragging, setDragging] = useState(false);
  const [taskStyle, setTaskStyle] = useState({});

  const taskRef = useRef(null);

  function handle(e) {
    console.log(e);
    console.log("hi");
  }
  function dragStart(e) {
    setDragging(true);
    // console.log("taskStyle Left:", taskStyle.left);
    // console.log(refAddress);
  }
  function drag(e) {
    setTaskStyle({
      position: "absolute",
      targetLeft: e.touches[0].clientX,
      targetTop: e.touches[0].clientY,
      left: e.touches[0].clientX - taskRef.current.clientWidth / 2,
      top: e.touches[0].clientY - taskRef.current.clientHeight / 2,
    });
    // console.log(e);
    // console.log(
    //   "task left:",
    //   e.target.getBoundingClientRect().left +
    //     e.target.getBoundingClientRect().width
    // );
    // console.log("refs1 left:", refAddress.doneRef[0].left);
    // console.log(
    //   "refs1 right:",
    //   refAddress.doneRef[0].left + refAddress.doneRef[0].width
    // );
    // console.log(
    //   "refs2 left:",
    //   refAddress.ongoingRef[0].left + refAddress.ongoingRef[0].width
    // );

    console.log(e.changedTouches[0].clientX);
    console.log("refs1 left:", refAddress.doneRef[0].left);

    if (
      taskStyle.left >
        refAddress.ongoingRef[0].left - refAddress.ongoingRef[0].width / 2 &&
      taskStyle.left <
        refAddress.ongoingRef[0].left + refAddress.ongoingRef[0].width / 2 &&
      taskStyle.top > refAddress.ongoingRef[0].top &&
      taskStyle.top <
        refAddress.ongoingRef[0].top + refAddress.ongoingRef[0].height
    ) {
      console.log("yes");
    }
    // console.log("task:", taskStyle.left);
    // console.log("ref:", refAddress.ongoingRef[0].left);
  }
  function dropped(e) {
    if (isDragging) {
      // console.log(e.changed);
      // console.log("task:", taskStyle.left);
      // console.log("ref:", refAddress.ongoingRef[0].left);
      // if (
      //   taskStyle.left < refAddress.ongoingRef[0].left &&
      //   taskStyle.left <
      //     refAddress.ongoingRef[0].left + refAddress.ongoingRef[0].width
      // ) {
      //   console.log("yes");
      // }
    }
    setDragging(false);
    setTaskStyle({});
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
