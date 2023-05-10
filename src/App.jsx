import "./App.css";
import Column from "./components/Column";
import Transport from "./components/Transport";
function App() {
  const state = ["PLANNED", "ONGOING", "DONE"];
  return (
    <div className="App">
      <Transport state={state} />
      {state.map((item) => (
        <Column state={item} key={item} />
      ))}
    </div>
  );
}

export default App;
