import { Stylesheet } from "cytoscape";
import { ThemeOptions } from "../enums";
import { themeStyles } from "../common/data";

export const setGraphStyle = (theme: ThemeOptions): Stylesheet[] => {
  return themeStyles[theme];
};
