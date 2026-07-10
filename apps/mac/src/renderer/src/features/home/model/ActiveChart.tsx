import { Line } from "react-chartjs-2";
import "chart.js/auto";
import type { TooltipItem } from "chart.js";
import { useTheme } from "styled-components";

interface ActiveLineChartProps {
  data: {
    labels: number[];
    values: number[];
  };
}

export const ActiveLineChart = ({ data }: ActiveLineChartProps) => {
  const theme = useTheme();
  const labels = data.labels.map(v => `${v}월`);
  const values = data.values.map(v => v);

  return (
    <Line
      data={{
        labels,
        datasets: [
          {
            data: values,
            borderColor: theme.dataVisualization.series[0],
            backgroundColor: theme.dataVisualization.series[0],
            borderWidth: 2.5,
            pointRadius: 8,
            pointHoverRadius: 9,
            pointBackgroundColor: theme.dataVisualization.series[0],
            tension: 0,
            fill: false,
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: theme.dataVisualization.tooltip.background,
            borderColor: theme.dataVisualization.tooltip.border,
            bodyColor: theme.dataVisualization.tooltip.label,
            titleColor: theme.dataVisualization.tooltip.label,
            borderWidth: 1,
            displayColors: false,
            callbacks: {
              title: () => "",
              label: (tooltipItem: TooltipItem<"line">) => {
                const value = tooltipItem.raw;
                if (value === null || value === undefined) return "";
                return String(value);
              },
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              color: theme.dataVisualization.axisLabel,
            },
          },
          y: {
            display: false,
            grid: { display: false, color: theme.line.alternative },
          },
        },
      }}
    />
  );
};
