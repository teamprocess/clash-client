export interface Theme {
  primary: {
    normal: string;
  };
  action: {
    primary: {
      background: string;
      foreground: string;
    };
    danger: {
      background: string;
      foreground: string;
    };
  };
  content: {
    accent: string;
  };
  badge: {
    primary: {
      background: string;
      foreground: string;
    };
    danger: {
      background: string;
      foreground: string;
    };
  };
  interaction: {
    selectionBorder: string;
    selected: {
      background: string;
      foreground: string;
    };
  };
  feedback: {
    danger: string;
    success: string;
  };
  dataVisualization: {
    axisLabel: string;
    onSeries: string;
    series: readonly [string, string, string, string, string];
    tooltip: {
      background: string;
      border: string;
      label: string;
    };
  };
  label: {
    normal: string;
    strong: string;
    neutral: string;
    alternative: string;
    assistive: string;
    disable: string;
  };
  line: {
    normal: string;
    neutral: string;
    alternative: string;
  };
  fill: {
    normal: string;
    neutral: string;
    alternative: string;
  };
  background: {
    normal: string;
    neutral: string;
    alternative: string;
  };
}
