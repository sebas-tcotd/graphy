import { Stylesheet } from "cytoscape";
import { ThemeOptions } from "../../enums";

export const themeStyles: Record<ThemeOptions, Stylesheet[]> = {
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
        "line-color": "rgb(240, 240, 240)",
        opacity: 0.5,
      },
    },
    {
      selector: ".highlight",
      style: {
        "background-color": "#B721FF",
        color: "white",
        "line-color": "rgba(184, 31, 255, 0.5)",
        "transition-property": "background-color, line-color",
        "transition-duration": 0.5,
      },
    },
  ],
  light: [{ selector: "node", style: { backgroundColor: "#333333" } }],
};
