import type { Theme } from "./types";

export const darkTheme: Theme = {
  primary: {
    normal: "#f1070a",
  },
  action: {
    primary: {
      background: "#f1070a",
      foreground: "#fcfcfc",
    },
  },
  content: {
    accent: "#fecdce",
  },
  badge: {
    primary: {
      background: "#c60608",
      foreground: "#fcfcfc",
    },
  },
  interaction: {
    selectionBorder: "#fecdce",
  },
  feedback: {
    danger: "#f1070a",
    success: "#48ea89",
  },
  dataVisualization: {
    axisLabel: "#c4c5c6",
    onSeries: "#0d0d0d",
    series: ["#f5f5f5", "#66c7ff", "#fc9c9d", "#48ea89", "#ffd633"],
    tooltip: {
      background: "#2a2b2c",
      border: "#747678",
      label: "#f5f5f5",
    },
  },
  label: {
    normal: "#f5f5f5",
    strong: "#ffffff",
    neutral: "#dcddde",
    alternative: "#c4c5c6",
    assistive: "#9c9d9f",
    disable: "#3c3e3f",
  },
  line: {
    normal: "#747678",
    neutral: "#48494a",
    alternative: "#383a3b",
  },
  fill: {
    normal: "#2a2b2c",
    neutral: "#383a3b",
    alternative: "#48494a",
  },
  background: {
    normal: "#2a2b2c",
    neutral: "#4d4f51",
    alternative: "#303234",
  },
};
