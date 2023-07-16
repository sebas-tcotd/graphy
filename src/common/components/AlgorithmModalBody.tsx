import { useDispatch } from "react-redux";
import { GraphAlgorithmTypes } from "../../enums";
import { AppDispatch } from "../../store";
import { setGraphAlgorithm } from "../../store/slices/graph";
import { setActiveModal } from "../../store/slices/modal";
import { algorithmAlternativesData } from "../data/algorithmAlternativesData";

export const AlgorithmModalBody = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleButtonClick = (algorithmType: GraphAlgorithmTypes) => {
    dispatch(setGraphAlgorithm({ algorithmUsed: algorithmType }));
    dispatch(setActiveModal({ isActive: false }));
  };
  return (
    <div>
      <p className="mb-4">
        Select an algorythm to solve and it will be displayed in the graph.
      </p>
      <div className="grid grid-cols-2 gap-3">
        {algorithmAlternativesData.map(({ name, type }) => (
          <button
            key={type}
            onClick={() => handleButtonClick(type)}
            className="p-3 | border border-white rounded | bg-violet-900/60 hover:bg-violet-950/70 active:bg-violet-950 active:ring-2 active:border-white/20 active:ring-violet-500 | transition-all"
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
};
