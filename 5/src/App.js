import Drag from './Drag';
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="grid">
        <Drag number="3" />
        <Drag number="1" />
        <Drag number="4" />
        <Drag number="9" />
        <Drag number="7" />
        <Drag number="6" />
        <Drag number="8" />
        <Drag number="2" />
        <Drag number="5" />
      </div>
    </div>
  );
}

export default App;
