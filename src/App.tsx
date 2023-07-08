import { useState } from "react";
import { BottomBar, GraphView, Modal, TopBar } from "./components";
import { ModalData } from "./common/interfaces";

function App() {
  const [numberOfNodes, setNumberOfNodes] = useState<number>(0);
  const [modalData, setModalData] = useState<ModalData | undefined>(undefined);
  const [isModalActive, setModalActive] = useState<boolean>(false);

  const onBottomButtonClick = (modalData: ModalData) => {
    setModalData(modalData);
    setModalActive(true);
  };

  return (
    <main className="bg-gradient-to-tr from-[#2B3745] to-[#3A1B6C] | h-screen-dynamic | flex flex-col">
      <TopBar />
      <GraphView numberOfNodes={numberOfNodes} />
      <Modal
        modalData={modalData}
        modalActive={isModalActive}
        onModalActive={setModalActive}
      />
      <BottomBar onGenerate={setNumberOfNodes} onButtonClick={onBottomButtonClick} />
    </main>
  );
}

export default App;
