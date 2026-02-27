import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { colorsOfMultiLine } from "@/features/competition/model/useCompareRivals";

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
  return (
    <Line
      data={{
        labels: chartData.labels,
        datasets: chartData.datasets.map((ds, idx) => ({
          ...ds,
          borderColor: colorsOfMultiLine[idx % colorsOfMultiLine.length],
          backgroundColor: colorsOfMultiLine[idx % colorsOfMultiLine.length],
          pointBackgroundColor: colorsOfMultiLine[idx % colorsOfMultiLine.length],
          borderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 7,
        })),
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
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
            backgroundColor: "#2A2B2C",
            borderColor: "#747678",
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
            ticks: { color: "#A1A1A1" },
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
