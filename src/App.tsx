import { useEffect, useState } from "react";
import { BottomBar, GraphView, Modal, TopBar } from "./components";
import { ModalData } from "./common/interfaces";
import { setModalBody } from "./utils/setModalType";
import { useDispatch } from "react-redux";
import { setSettingLanguage } from "./store/slices/settings";

function App() {
  const [modalData, setModalData] = useState<ModalData | undefined>(undefined);
  const dispatch = useDispatch();

  useEffect(() => {
    const cachedLanguage = localStorage.getItem("language");
    if (cachedLanguage) {
      dispatch(
        setSettingLanguage({
          language: JSON.parse(cachedLanguage),
        })
      );
    }
  });

  const onBottomButtonClick = (modalData: ModalData) => {
    setModalData(modalData);
  };

  return (
    <main className="bg-gradient-to-tr from-[#2B3745] to-[#3A1B6C] | h-screen-dynamic | flex flex-col">
      <TopBar />
      <GraphView />
      <Modal modalData={modalData}>
        {modalData &&
          setModalBody({
            type: modalData?.type,
            bodyProps: { ...modalData.bodyProps },
          })}
      </Modal>
      <BottomBar onButtonClick={onBottomButtonClick} />
    </main>
  );
}

export default App;
