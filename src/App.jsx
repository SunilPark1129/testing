import "./App.css";
import Column from "./components/Column";
import Transport from "./components/Transport";
import Update from "./components/Update";
function App() {
  const state = ["PLANNED", "ONGOING", "DONE"];
  return (
    <div className="App">
      {state.map((item, idx) => (
        <Column state={item} key={item} currentIdx={idx} />
      ))}
      <Update />
      {/* <Transport state={state} /> */}
    </div>
  );
}

export default App;
