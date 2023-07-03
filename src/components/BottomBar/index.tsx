import NumbersIcon from "../../assets/numbers.svg";
import LayoutsIcon from "../../assets/layouts.svg";
import FormulaIcon from "../../assets/formula.svg";

export const BottomBar = () => {
  return (
    <div className="flex items-center gap-10 justify-between px-4 py-2 | border-t border-t-white | bg-white/10 backdrop-blur-sm">
      <button
        type="button"
        className="px-4 py-2 text-white font-bold text-sm rounded-md bg-gradient-to-tr from-[#1380FF] to-[#9B20D4] hover:bg-gradient-to-bl hover:to-[#9B20D4] hover:from-[#1380FF] | hover:transition-all"
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
