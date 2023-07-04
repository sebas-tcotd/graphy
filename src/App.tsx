import { BottomBar, GraphView, TopBar } from "./components";

function App() {
  return (
    <main className="bg-gradient-to-tr from-[#2B3745] to-[#3A1B6C] | min-h-screen | flex flex-col">
      <TopBar />
      <GraphView />
      <BottomBar />
    </main>
  );
}

export default App;
