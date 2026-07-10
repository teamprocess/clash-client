import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { useTheme } from "styled-components";

interface RivalCompetitionLineChartProps {
  chartData: {
    labels: string[];
    datasets: {
      label: string;
      data: (number | null)[];
    }[];
  };
  valueFormatter?: (value: number) => string;
}

export const RivalCompetitionLineChart = ({
  chartData,
  valueFormatter,
}: RivalCompetitionLineChartProps) => {
  const theme = useTheme();

  return (
    <Line
      data={{
        labels: chartData.labels,
        datasets: chartData.datasets.map((ds, idx) => {
          const seriesColor =
            theme.dataVisualization.series[idx % theme.dataVisualization.series.length];

          return {
            ...ds,
            borderColor: seriesColor,
            backgroundColor: seriesColor,
            pointBackgroundColor: seriesColor,
            borderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 7,
          };
        }),
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            labels: {
              color: theme.label.normal,
            },
            onClick: (_, legendItem, legend) => {
              const index = legendItem.datasetIndex;
              if (index === undefined) return;

              const chart = legend.chart;

              const anyHidden = chart.data.datasets.some((_, i) => chart.getDatasetMeta(i).hidden);

              if (index === 0) {
                if (anyHidden) {
                  chart.data.datasets.forEach((_, i) => {
                    chart.getDatasetMeta(i).hidden = false;
                  });
                } else {
                  chart.data.datasets.forEach((_, i) => {
                    chart.getDatasetMeta(i).hidden = i !== 0;
                  });
                }
                chart.update();
                return;
              }

              const visibleIndices = chart.data.datasets
                .map((_, i) => i)
                .filter(i => !chart.getDatasetMeta(i).hidden);

              const isCompareMode =
                visibleIndices.length === 2 &&
                visibleIndices.includes(0) &&
                visibleIndices.includes(index);

              if (isCompareMode) {
                chart.data.datasets.forEach((_, i) => {
                  chart.getDatasetMeta(i).hidden = false;
                });
              } else {
                chart.data.datasets.forEach((_, i) => {
                  chart.getDatasetMeta(i).hidden = i !== 0 && i !== index;
                });
              }

              chart.update();
            },
          },
          tooltip: {
            backgroundColor: theme.dataVisualization.tooltip.background,
            borderColor: theme.dataVisualization.tooltip.border,
            bodyColor: theme.dataVisualization.tooltip.label,
            titleColor: theme.dataVisualization.tooltip.label,
            borderWidth: 1,
            usePointStyle: true,
            boxPadding: 4,
            callbacks: {
              title: () => "",
              label: tooltipItem => {
                const value = tooltipItem.raw;
                if (value === null || value === undefined) return "";
                if (typeof value === "number" && valueFormatter) return valueFormatter(value);
                return value.toString();
              },
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: theme.dataVisualization.axisLabel },
          },
          y: {
            display: false,
            grid: { display: false },
          },
        },
      }}
    />
  );
};
