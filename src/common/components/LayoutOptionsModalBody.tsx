import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { LayoutTypes } from "../../enums/LayoutTypes";
import { setGraphLayout } from "../../store/slices/graph";
import { layoutOptionsData } from "../data/layoutOptionsData";
import { setActiveModal } from "../../store/slices/modal";
import { RootState } from "../../store";

interface InputTypes {
  layoutType: LayoutTypes;
}

export const LayoutOptionsModalBody = () => {
  const dispatch = useDispatch();
  const { layout } = useSelector((state: RootState) => state.graph);
  const { register } = useForm<InputTypes>();

  const handleOptionClick = (type: LayoutTypes) => {
    dispatch(setGraphLayout({ layout: type }));
    dispatch(setActiveModal({ isActive: false }));
  };

  return (
    <form className="grid grid-cols-2 sx:grid-cols-3 gap-4 md:gap-8">
      {layoutOptionsData.map(({ icon, layoutName, type }) => (
        <label
          htmlFor={`layout-form__${type}`}
          className="flex flex-col h-full items-center"
          key={type}
        >
          <button
            type="button"
            className="w-full p-3 | border border-white rounded-md | flex flex-col justify-center items-center flex-1 | disabled:bg-indigo-950/60 disabled:ring-4 disabled:ring-violet-700"
            onClick={() => handleOptionClick(type)}
            disabled={layout === type}
          >
            <img src={icon} alt={`${layoutName} Layout`} />
            <input
              type="radio"
              id={`layout-form__${type}`}
              className="hidden"
              {...register("layoutType")}
            />
          </button>
          <span className="block w-full py-2 text-center">{layoutName}</span>
        </label>
      ))}
    </form>
  );
};
