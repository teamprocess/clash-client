import type { Theme } from "./types";

export const lightTheme: Theme = {
  primary: {
    normal: "#f1070a",
  },
  action: {
    primary: {
      background: "#c60608",
      foreground: "#fcfcfc",
    },
  },
  content: {
    accent: "#c60608",
  },
  badge: {
    primary: {
      background: "#c60608",
      foreground: "#fcfcfc",
    },
  },
  interaction: {
    selectionBorder: "#c60608",
  },
  feedback: {
    danger: "#c60608",
    success: "#0a5c2b",
  },
  dataVisualization: {
    axisLabel: "#5a5c5d",
    onSeries: "#fcfcfc",
    series: ["#5a5c5d", "#006199", "#c60608", "#0a5c2b", "#665200"],
    tooltip: {
      background: "#2a2b2c",
      border: "#747678",
      label: "#f5f5f5",
    },
  },
  label: {
    normal: "#0c0c0d",
    strong: "#000000",
    neutral: "#3c3e3f",
    alternative: "#5a5c5d",
    assistive: "#76787a",
    disable: "#e6e6e7",
  },
  line: {
    normal: "#c1c2c3",
    neutral: "#dadbdc",
    alternative: "#e8e8e9",
  },
  fill: {
    normal: "#f7f7f7",
    neutral: "#e6e6e7",
    alternative: "#dddedf",
  },
  background: {
    normal: "#ffffff",
    neutral: "#f7f7f7",
    alternative: "#f7f7f7",
  },
};
