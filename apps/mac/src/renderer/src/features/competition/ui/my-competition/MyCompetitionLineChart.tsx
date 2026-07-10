import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { formatTime } from "@/shared/lib";
import type { AnalyzeCategory } from "@/entities/competition";
import { useTheme } from "styled-components";

interface MyCompetitionLineChartProps {
  dataPoint: {
    labels: string[];
    values: number[];
  };
  category: AnalyzeCategory;
}

export const MyCompetitionLineChart = ({ dataPoint, category }: MyCompetitionLineChartProps) => {
  const theme = useTheme();
  const labels = dataPoint.labels.map(label => {
    const [month, day] = label.split("-");
    return `${Number(month)}월 ${Number(day)}일`;
  });

  const values = dataPoint.values.map(v => {
    const value = v ?? 0;

    if (category === "EXP") {
      return Math.round(value);
    }

    if (category === "GITHUB") {
      return Math.round(value * 10) / 10;
    }

    return Math.abs(value);
  });

  return (
    <Line
      data={{
        labels,
        datasets: [
          {
            data: values,
            borderWidth: 2,
            borderColor: theme.dataVisualization.series[1],
            backgroundColor: "transparent",
            pointRadius: 8,
            pointHoverRadius: 9,
            pointBackgroundColor: theme.dataVisualization.series[1],
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
              label: tooltipItem => {
                const value = tooltipItem.raw as number;
                if (value === null || value === undefined) return "";

                if (category === "ACTIVE_TIME") {
                  return formatTime(value);
                }

                return value.toString();
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
