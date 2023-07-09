import { useRef, useEffect, useState } from "react";
import { ThemeOptions } from "../../enums";
import ZoomInIcon from "../../assets/zoom-in.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export const GraphView = () => {
  const { numberOfNodes, complexity } = useSelector(
    (state: RootState) => state.graph
  );

  const graphDivRef = useRef<HTMLDivElement | null>(null);
  const cyRef = useRef<cytoscape.Core | null>(null);
  const [isGraphLoaded, setGraphLoaded] = useState(false);

  useEffect(() => {
    if (!(numberOfNodes && complexity)) return;
    if (numberOfNodes <= 0) return;

    (async () => {
      const [cytoscapeModule, utilsModule] = await Promise.all([
        import("cytoscape"),
        import("../../utils"),
      ]);
      const cytoscape = cytoscapeModule.default;
      const { createGraphElementsCollection, setGraphStyle } = utilsModule;
      setGraphLoaded(false);

      cyRef.current = cytoscape({
        container: graphDivRef.current,
        elements: createGraphElementsCollection(numberOfNodes, complexity),
        style: setGraphStyle(ThemeOptions.DARK),
      });
      cyRef.current.layout({ name: "circle" }).run();
      setGraphLoaded(true);
    })();
  }, [numberOfNodes, complexity, graphDivRef]);

  const handleGraphFocus = (): void => {
    const cy = cyRef.current;
    cy?.fit();
  };

  return (
    <div className="flex flex-col items-center justify-center | flex-1 |  text-center | relative ">
      {!numberOfNodes || numberOfNodes <= 0 ? (
        <span className="text-white/60 px-8 text-sm">
          Click on the "Generate" button to create a random graph!
        </span>
      ) : (
        <div id="graph" className="w-full h-full" ref={graphDivRef} />
      )}

      {numberOfNodes && numberOfNodes > 0 && isGraphLoaded && (
        <button
          type="button"
          title="Centrar vista"
          className="absolute bottom-2 right-2 | p-2 sx:p-4 | border border-white/20 hover:border-white/5 rounded-xl | bg-white/5 hover:bg-white/20 | backdrop-blur-md | transition ease-in-out "
          onClick={handleGraphFocus}
        >
          <img src={ZoomInIcon} alt="Center the graph view" />
        </button>
      )}
    </div>
  );
};
