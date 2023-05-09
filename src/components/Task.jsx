import classNames from "classnames";
import "./Task.css";
import { useStore } from "../store";

export default function Task({ title }) {
  const task = useStore((store) =>
    store.tasks.find((task) => task.title === title)
  );
  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const deleteTask = useStore((store) => store.deleteTask);
  function handle() {
    console.log("hi");
  }
  return (
    <div
      className="task"
      draggable
      onDragStart={() => {
        setDraggedTask(task.title);
      }}
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
