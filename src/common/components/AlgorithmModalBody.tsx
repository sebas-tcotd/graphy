import { useDispatch } from "react-redux";
import { setGraphAlgorithm } from "../../store/slices/graph";
import { SelectedAlgorithms } from "../../enums";
import { setActiveModal } from "../../store/slices/modal";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AlgorithmModalBodyProps {}

export const AlgorithmModalBody: React.FC<AlgorithmModalBodyProps> = () => {
  const dispatch = useDispatch();

  const handleButtonClick = () => {
    dispatch(
      setGraphAlgorithm({ algorithmUsed: SelectedAlgorithms.BRIDGES })
    );
    dispatch(setActiveModal({ isActive: false }));
  };
  return (
    <div>
      <p className="mb-4">
        Select an algorythm to solve and it will be displayed in the graph.
      </p>
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleButtonClick}
          className="p-3 | border border-white rounded | bg-violet-900/60 hover:bg-violet-950/70 active:bg-violet-950 active:ring-2 active:border-white/20 active:ring-violet-500 | transition-all"
        >
          Find bridges
        </button>
        <button className="p-3 | border border-white rounded | bg-violet-900/60 hover:bg-violet-950/70 active:bg-violet-950 active:ring-2 active:border-white/20 active:ring-violet-500 | transition-all">
          Find COSE
        </button>
      </div>
    </div>
  );
};
