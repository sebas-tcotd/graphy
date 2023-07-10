import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GraphStatus } from "../../../enums";
import { LayoutTypes } from "../../../enums/LayoutTypes";

interface GraphState {
  complexity?: number;
  layout?: LayoutTypes;
  numberOfNodes?: number;
  status?: GraphStatus;
}

export const graphSlice = createSlice({
  name: "graph",
  initialState: {
    numberOfNodes: undefined,
    complexity: 0.5,
    status: GraphStatus.NOT_CREATED,
    layout: LayoutTypes.CIRCULAR,
  } as GraphState,
  reducers: {
    setGraphData: (state, { payload }: PayloadAction<GraphState>) => {
      state.numberOfNodes = payload.numberOfNodes;
      state.complexity = payload.complexity;
      state.layout = payload.layout;
    },
    setGraphStatus: (
      state,
      { payload }: PayloadAction<{ status: GraphStatus }>
    ) => {
      state.status = payload.status;
    },
    setGraphLayout: (
      state,
      { payload }: PayloadAction<{ layout: LayoutTypes }>
    ) => {
      state.layout = payload.layout;
    },
  },
});

export const { setGraphData, setGraphStatus, setGraphLayout } =
  graphSlice.actions;
