import NumbersIcon from "../../assets/numbers.svg";
import LayoutsIcon from "../../assets/layouts.svg";
import FormulaIcon from "../../assets/formula.svg";
import { buttonClasses } from "./classes";
import { BottomBarProps } from "./types";

export const BottomBar: React.FC<BottomBarProps> = ({ onGenerate }) => {
  const handleGenerateButton = () => {
    const numberOfNodes = Math.floor(Math.random() * 20);
    onGenerate(numberOfNodes);
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
        <button type="button" className="p-2 sx:p-4">
          <img src={NumbersIcon} alt="" />
        </button>
        <button type="button" className="p-2 sx:p-4">
          <img src={LayoutsIcon} alt="" />
        </button>
        <button type="button" className="p-2 sx:p-4">
          <img src={FormulaIcon} alt="" />
        </button>
      </div>
    </div>
  );
};
