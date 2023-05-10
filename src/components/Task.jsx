import classNames from "classnames";
import "./Task.css";
import { useStore } from "../store";
import { useState, useRef, useEffect } from "react";

let longtapTimer;
export default function Task({ title, state }) {
  const task = useStore((store) =>
    store.tasks.find((task) => task.title === title)
  );
  const refAddress = useStore((store) => store.refAddress);
  const setDroppable = useStore((store) => store.setDroppable);
  const setDragging = useStore((store) => store.setDragging);
  const setLongtap = useStore((store) => store.setLongtap);
  const moveTask = useStore((store) => store.moveTask);

  const [taskStyle, setTaskStyle] = useState({});
  const [hasAction, setAction] = useState(true);
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
  }, [hasAction]);

  const taskRef = useRef(null);
  function dragStart(e) {
    setDragging(true);
    setAction(false);
    console.log("started");
  }
  function drag(e, touch) {
    document.body.style.overflow = "hidden";
    setAction(true);
    console.log("moved");

    // move task with mouse pointer
    // console.log(e);

    let curPosX;
    let curPosY;

    if (touch) {
      setTaskStyle({
        position: "absolute",
        left: e.touches[0].clientX - taskRef.current.clientWidth / 2,
        top: e.touches[0].pageY - taskRef.current.clientHeight / 2,
        boxShadow: "0px 3px 3px 3px rgba(41, 41, 41, 0.452)",
      });
      curPosX = e.touches[0].clientX;
      curPosY = e.touches[0].clientY;
    } else {
      setTaskStyle({
        position: "absolute",
        left: e.clientX - taskRef.current.clientWidth / 2,
        top: e.pageY - taskRef.current.clientHeight / 2,
        boxShadow: "0px 3px 3px 3px rgba(41, 41, 41, 0.452)",
      });
      curPosX = e.clientX;
      curPosY = e.clientY;
    }

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
    e.stopPropagation();
  }
  function dropped(e, touch) {
    setAction(true);
    document.body.style.overflow = "auto";

    let curPosX;
    let curPosY;

    if (touch) {
      curPosX = e.changedTouches[0].clientX;
      curPosY = e.changedTouches[0].clientY;
    } else {
      curPosX = e.clientX;
      curPosY = e.clientY;
    }

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
    setDroppable(null);
    setTaskStyle({});
    setDragging(false);
  }
  return (
    <div
      ref={taskRef}
      className="task"
      draggable
      onDragStart={(e) => {
        dragStart(e, false);
      }}
      onDrag={(e) => {
        drag(e, false);
      }}
      onDragEnd={(e) => {
        dropped(e, false);
      }}
      onTouchStart={(e) => {
        dragStart(e, true);
      }}
      onTouchMove={(e) => {
        drag(e, true);
      }}
      onTouchEnd={(e) => {
        dropped(e, true);
      }}
      style={taskStyle}
    >
      <div>{task.title}</div>
    </div>
  );
}
