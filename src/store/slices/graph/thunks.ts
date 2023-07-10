import { createAsyncThunk } from "@reduxjs/toolkit";
import { setGraphData, setGraphStatus } from ".";
import { GraphStatus, LayoutTypes } from "../../../enums";

export const createGraph = createAsyncThunk<
  void,
  { complexity: number; numberOfNodes: number; layout: LayoutTypes }
>(
  "graph/createGraph",
  async ({ complexity, layout, numberOfNodes }, thunkAPI) => {
    thunkAPI.dispatch(setGraphData({ complexity, layout, numberOfNodes }));
    thunkAPI.dispatch(setGraphStatus({ status: GraphStatus.CREATED }));
  }
);
