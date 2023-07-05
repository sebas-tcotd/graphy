import { useState } from "react";
import { BottomBar, GraphView, TopBar } from "./components";

function App() {
  const [numberOfNodes, setNumberOfNodes] = useState<number>(0);

  return (
    <main className="bg-gradient-to-tr from-[#2B3745] to-[#3A1B6C] | h-screen | flex flex-col">
      <TopBar />
      <GraphView numberOfNodes={numberOfNodes} />
      <BottomBar onGenerate={setNumberOfNodes} />
    </main>
  );
}

export default App;
