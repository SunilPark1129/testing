import React, { useState, useRef, useEffect } from "react";
import { useStore } from "../store";
import "./Transport.css";

export default function Transport() {
  const setRefAddress = useStore((store) => store.setRefAddress);
  const parentRef = useRef(null);
  const plannedRef = useRef(null);
  const ongoingRef = useRef(null);
  const doneRef = useRef(null);
  const unmounted = useRef(true);

  useEffect(() => {
    if (!unmounted.current) {
      console.log(doneRef);
      function handleResize() {
        console.log("he");
        const top = parentRef.current.offsetTop;
        const one = [plannedRef, ongoingRef, doneRef].map((item) => {
          return [
            {
              width: item.current.clientWidth,
              height: item.current.clientWidth,
              left: item.current.offsetLeft,
              top: top,
            },
          ];
        });
        setRefAddress({
          plannedRef: one[0],
          ongoingRef: one[1],
          doneRef: one[2],
        });
      }

      window.addEventListener("resize", handleResize);
    }
    return () => {
      unmounted.current = false;
    };
  }, []);
  return (
    <div className="transport" ref={parentRef}>
      <div className="transport__child --planned" ref={plannedRef}>
        planned
      </div>
      <div className="transport__child --ongoing" ref={ongoingRef}>
        ongoing
      </div>
      <div className="transport__child --done" ref={doneRef}>
        done
      </div>
    </div>
  );
}
