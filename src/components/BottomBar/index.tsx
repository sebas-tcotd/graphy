import { buttonClasses } from "./classes";
import { BottomBarProps } from "./types";
import { BottomBarButtons } from "../../common/data";
import { ModalData } from "../../common/interfaces";
import { useDispatch } from "react-redux";
import { setActiveModal, setGraphData } from "../../store/slices";
import { GraphStatus } from "../../enums";

export const BottomBar: React.FC<BottomBarProps> = ({ onButtonClick }) => {
  const dispatch = useDispatch();

  const handleGenerateButton = () => {
    const numberOfNodes = Math.floor(Math.random() * 19) + 1;
    const complexity = Number((Math.random() * 0.9).toFixed(1)) + 0.1;
    dispatch(
      setGraphData({
        numberOfNodes,
        complexity,
        status: GraphStatus.CREATING,
      })
    );
  };

  const handleButtonClick = (modalData: ModalData) => {
    dispatch(setActiveModal({ isActive: true }));
    onButtonClick(modalData);
  };

  return (
    <div className="flex items-center gap-10 justify-between | flex-initial | px-4 py-2 | border-t border-t-white | bg-white/10 backdrop-blur-sm ">
      <button
        type="button"
        onClick={handleGenerateButton}
        className={buttonClasses}
      >
        Generate
      </button>

      <div className="flex items-center">
        {BottomBarButtons.map((button) => (
          <button
            key={button.modalData.type}
            type="button"
            className="p-2 sx:p-4"
            onClick={() => handleButtonClick(button.modalData)}
            title={button.name}
          >
            <img src={button.icon} alt={button.name} />
          </button>
        ))}
      </div>
    </div>
  );
};
