import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GraphStatus } from "../../enums";

interface GraphState {
  numberOfNodes?: number;
  complexity?: number;
  status?: GraphStatus;
}

export const graphSlice = createSlice({
  name: "graph",
  initialState: {
    numberOfNodes: undefined,
    complexity: undefined,
    status: GraphStatus.NOT_CREATED,
  } as GraphState,
  reducers: {
    setGraphData: (state, { payload }: PayloadAction<GraphState>) => {
      return {
        ...state,
        numberOfNodes: payload.numberOfNodes,
        complexity: payload.complexity,
        status: payload?.status ?? GraphStatus.NOT_CREATED,
      };

      // state.numberOfNodes = payload.numberOfNodes;
      // state.complexity = payload.complexity;
      // state.status = payload?.status ?? GraphStatus.NOT_CREATED;
    },
    setGraphStatus: (state, { payload }: PayloadAction<GraphState>) => {
      state.status = payload.status;
    },
  },
});

export const { setGraphData, setGraphStatus } = graphSlice.actions;
