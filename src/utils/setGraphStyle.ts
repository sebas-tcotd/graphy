import { Stylesheet } from "cytoscape";
import { ThemeOptions } from "../enums";

const themeActions: Record<ThemeOptions, Stylesheet[]> = {
  dark: [
    {
      selector: "node",
      style: {
        "font-family": "Fira Code, Roboto Mono, Cascadia Code, monospace",
        "font-size": "14px",
        "font-weight": "bold",
        "text-halign": "center",
        "text-valign": "center",
        "border-width": "1px",
        "border-color": "#364263",
        "border-style": "double",
        backgroundColor: "#FAFAFA",
        color: "#364263",
        label: "data(id)",
      },
    },
    {
      selector: "edge",
      style: {
        "curve-style": "bezier",
        "line-color": "rgb(240, 240, 240)",
        opacity: 0.5,
      },
    },
  ],
  light: [{ selector: "node", style: { backgroundColor: "#333333" } }],
};

export const setGraphStyle = (theme: ThemeOptions) => {
  return themeActions[theme];
};
