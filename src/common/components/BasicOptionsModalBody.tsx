import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { buttonClasses } from "../../components/BottomBar/classes";
import { GraphStatus, LayoutTypes } from "../../enums";
import { setGraphData } from "../../store/slices/graph";
import { setActiveModal } from "../../store/slices/modal";
import { RootState } from "../../store/store";

interface InputTypes {
  numberOfNodes: number;
  complexity: number;
}

export interface BasicOptionsModalBodyProps {
  placeholder?: string;
}

export const BasicOptionsModalBody: React.FC<BasicOptionsModalBodyProps> = ({
  placeholder = "Insert",
}) => {
  const { numberOfNodes, complexity, layout } = useSelector(
    (state: RootState) => state.graph
  );
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue } = useForm<InputTypes>();

  useEffect(() => {
    setValue("numberOfNodes", numberOfNodes as number);
    setValue("complexity", (complexity as number) * 10);
  }, [numberOfNodes, complexity, setValue]);

  const onSubmit: SubmitHandler<InputTypes> = (data) => {
    const newNumberOfNodes = data.numberOfNodes;
    const newComplexity = isNaN(data.complexity) ? 0.5 : data.complexity / 10;

    if (newNumberOfNodes === numberOfNodes && newComplexity === complexity) {
      dispatch(setActiveModal({ isActive: false }));
      return;
    }
    
    dispatch(
      setGraphData({
        numberOfNodes: newNumberOfNodes,
        complexity: newComplexity,
        status: GraphStatus.CREATING,
        layout: layout ?? LayoutTypes.CIRCULAR,
      })
    );
    dispatch(setActiveModal({ isActive: false }));
  };

  const getAction = (): string => {
    return !numberOfNodes || !complexity || !layout ? "Create" : "Update";
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <label
        className="font-bold flex flex-col gap-2"
        htmlFor="control-form--number-of-nodes"
      >
        <span>Number of nodes</span>
        <input
          type="number"
          {...register("numberOfNodes", {
            required: true,
            valueAsNumber: true,
          })}
          id="control-form--number-of-nodes"
          placeholder={placeholder}
          className="text-white p-3 rounded-lg | border border-white bg-white/25 | focus:shadow-inner-md focus:outline-none focus:ring focus:ring-violet-500 | transition-all | placeholder:text-gray-300"
          min={1}
        />
      </label>

      <label
        htmlFor="control-form--graph-complexity"
        className="font-bold flex flex-col gap-2"
      >
        <span>Complexity</span>
        <input
          type="range"
          {...register("complexity", { required: true, valueAsNumber: true })}
          id="control-form--graph-complexity"
          className="my-2 in-range:bg-gradient-to-r accent-white focus:accent-violet-500 active:accent-violet-500 rounded-lg | transition-all"
          min={1}
          max={10}
        />
      </label>

      <button type="submit" className={buttonClasses}>
        {getAction()} graph
      </button>
    </form>
  );
};
