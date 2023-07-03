import { BottomBar, TopBar } from "./components";

function App() {
  return (
    <main className="bg-gradient-to-tr from-[#2B3745] to-[#3A1B6C] min-h-screen">
      <TopBar />
      {/* Separación temporal */}
      <div style={{ height: "100px" }}></div>
      <BottomBar />
    </main>
  );
}

export default App;
