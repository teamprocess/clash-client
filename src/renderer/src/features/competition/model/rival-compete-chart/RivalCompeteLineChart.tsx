import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { colorsOfMultiLine } from "@/features/competition/model/useCompareRivals";

// 멀티차트 변환 후 props Type
interface RivalCompetitionLineChartProps {
  chartData: {
    labels: string[];
    datasets: {
      label: string;
      data: (number | null)[];
    }[];
  };
}

export const RivalCompetitionLineChart = ({ chartData }: RivalCompetitionLineChartProps) => {
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
