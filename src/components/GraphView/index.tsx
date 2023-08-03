import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ReactComponent as LoadingIcon } from "../../assets/loading.svg";
import { ReactComponent as ZoomIcon } from "../../assets/zoom-in.svg";
import { translations } from "../../common/data/translations";
import { GraphStatus } from "../../enums";
import { useGraphCreation } from "../../hooks";
import { RootState } from "../../store/store";

export const GraphView = () => {
  const { numberOfNodes, status } = useSelector(
    (state: RootState) => state.graph
  );
  const { language } = useSelector((state: RootState) => state.settings);
  const { graphDivRef, handleGraphFocus } = useGraphCreation();

  useEffect(() => {}, [language]);

  const getInitialText = () => {
    return translations.INITIAL_MESSAGE[language];
  };

  return (
    <div className="flex flex-col items-center justify-center | flex-1 |  text-center | relative ">
      {!numberOfNodes || numberOfNodes <= 0 ? (
        <span className="px-8 text-sm text-white/60">{getInitialText()}</span>
      ) : (
        <div id="graph" className="w-full h-full" ref={graphDivRef} />
      )}

      {status === GraphStatus.CREATING && (
        <div className="absolute inline w-12 h-12 animate-spin">
          <LoadingIcon />
        </div>
      )}

      {numberOfNodes && numberOfNodes > 0 && status === GraphStatus.CREATED && (
        <button
          type="button"
          title="Centrar vista"
          className="absolute bottom-2 right-2 | p-2 sx:p-4 | border border-white/20 hover:border-white/5 rounded-xl | bg-white/5 hover:bg-white/20 | backdrop-blur-md | transition ease-in-out "
          onClick={handleGraphFocus}
        >
          <ZoomIcon />
        </button>
      )}
    </div>
  );
};
