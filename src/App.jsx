import "./App.css";
import Column from "./components/Column";
import Menu from "./components/Menu";
function App() {
  const state = ["planned", "pending", "completed"];
  const bg = ["rgb(185, 207, 236)", "rgb(194, 167, 167)", "rgb(180, 207, 167)"];
  return (
    <div className="App">
      <Menu />
      {state.map((item, idx) => (
        <Column state={item} key={item} currentIdx={idx} bg={bg[idx]} />
      ))}
    </div>
  );
}

export default App;
