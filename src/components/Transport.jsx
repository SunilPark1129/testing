import React, { useState, useRef, useEffect } from "react";
import { useStore } from "../store";
import "./Transport.css";

export default function Transport({ state }) {
  const setRefAddress = useStore((store) => store.setRefAddress);
  const droppable = useStore((store) => store.droppable);
  const isDragging = useStore((store) => store.isDragging);

  const parentRef = useRef(null);
  const plannedRef = useRef(null);
  const ongoingRef = useRef(null);
  const doneRef = useRef(null);
  const unmounted = useRef(true);

  useEffect(() => {
    if (!unmounted.current) {
      //   console.log(parentRef.current.offsetTop + plannedRef.current.offsetTop);
      //   console.log(parentRef.current.offsetTop + doneRef.current.offsetTop);
      function handleResize() {
        // console.log("he");
        const top = parentRef.current.offsetTop;
        const one = [plannedRef, ongoingRef, doneRef].map((item, idx) => {
          //   console.log(plannedRef);
          //   console.log(ongoingRef);
          //   console.log(
          //     parentRef.current.offsetTop - parentRef.current.offsetHeight / 2
          //   );
          return [
            {
              state: state[idx],
              height: item.current.offsetHeight,
              width: 100,
              top:
                parentRef.current.offsetTop -
                parentRef.current.offsetHeight / 2 +
                item.current.offsetTop,
              bottom:
                parentRef.current.offsetTop -
                parentRef.current.offsetHeight / 2 +
                item.current.offsetTop +
                item.current.offsetHeight,
            },
          ];
        });
        setRefAddress({
          plannedRef: one[0],
          ongoingRef: one[1],
          doneRef: one[2],
        });
      }
      handleResize();

      window.addEventListener("resize", handleResize);
    }
    return () => {
      unmounted.current = false;
    };
  }, []);

  return (
    <div className={`transport ${isDragging && "actived"}`} ref={parentRef}>
      <div
        className={`transport__child -planned ${
          droppable === "PLANNED" && "--droppable"
        }`}
        ref={plannedRef}
      >
        PLANNED
      </div>
      <div
        className={`transport__child -ongoing ${
          droppable === "ONGOING" && "--droppable"
        }`}
        ref={ongoingRef}
      >
        PENDING
      </div>
      <div
        className={`transport__child -done ${
          droppable === "DONE" && "--droppable"
        }`}
        ref={doneRef}
      >
        COMPLETED
      </div>
    </div>
  );
}
