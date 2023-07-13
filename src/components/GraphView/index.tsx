import { useRef, useEffect } from "react";
import { GraphStatus, ThemeOptions } from "../../enums";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setGraphLayout, setGraphStatus } from "../../store/slices/graph";
import { findBridges } from "../../utils/algFindBridges";

const LoadingIcon = () => {
  return (
    <div className="w-12 h-12 absolute animate-spin inline">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="#FAFAFA"
        height="48"
        viewBox="0 -960 960 960"
        width="48"
      >
        <path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Z" />
      </svg>
    </div>
  );
};

export const GraphView = () => {
  const dispatch = useDispatch();
  const { numberOfNodes, complexity, status, layout, algorithmUsed } =
    useSelector((state: RootState) => state.graph);
  const graphDivRef = useRef<HTMLDivElement | null>(null);
  const cyRef = useRef<cytoscape.Core | null>(null);

  useEffect(() => {
    if (!layout) return;
    if (!(numberOfNodes && complexity)) return;
    if (numberOfNodes <= 0) return;
    if (graphDivRef && cyRef) {
      cyRef.current?.destroy();
      dispatch(setGraphStatus({ status: GraphStatus.CREATING }));
    }

    (async () => {
      const [cytoscapeModule, utilsModule] = await Promise.all([
        import("cytoscape"),
        import("../../utils"),
      ]);
      const cytoscape = cytoscapeModule.default;
      const { createGraphElementsCollection, setGraphStyle } = utilsModule;

      cyRef.current = cytoscape({
        container: graphDivRef.current,
        elements: createGraphElementsCollection(numberOfNodes, complexity),
        style: setGraphStyle(ThemeOptions.DARK),
        wheelSensitivity: 0.1,
      });
      cyRef.current.layout({ name: layout }).run();

      dispatch(setGraphLayout({ layout: layout }));
      dispatch(setGraphStatus({ status: GraphStatus.CREATED }));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberOfNodes, complexity, graphDivRef, dispatch]);

  useEffect(() => {
    if (!layout) return;
    if (!cyRef.current) return;
    const cy = cyRef.current;

    cy?.layout({ name: layout }).run();
  }, [layout]);

  const handleGraphFocus = (): void => {
    const cy = cyRef.current;
    cy?.fit();
  };

  useEffect(() => {
    if (!algorithmUsed) return;

    findBridges(cyRef.current as cytoscape.Core);
  }, [algorithmUsed]);

  return (
    <div className="flex flex-col items-center justify-center | flex-1 |  text-center | relative ">
      {!numberOfNodes || numberOfNodes <= 0 ? (
        <span className="text-white/60 px-8 text-sm">
          Click on the "Generate" button to create a random graph!
        </span>
      ) : (
        <div id="graph" className="w-full h-full" ref={graphDivRef} />
      )}

      {status === GraphStatus.CREATING && <LoadingIcon />}

      {numberOfNodes && numberOfNodes > 0 && status === GraphStatus.CREATED && (
        <button
          type="button"
          title="Centrar vista"
          className="absolute bottom-2 right-2 | p-2 sx:p-4 | border border-white/20 hover:border-white/5 rounded-xl | bg-white/5 hover:bg-white/20 | backdrop-blur-md | transition ease-in-out "
          onClick={handleGraphFocus}
        >
          <img src="assets/zoom-in.svg" alt="Center the graph view" />
        </button>
      )}
    </div>
  );
};
