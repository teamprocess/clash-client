import { Line } from "react-chartjs-2";
import "chart.js/auto";

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
        datasets: chartData.datasets.map(ds => ({
          ...ds,
          borderWidth: 2,
          tension: 0.3,
          fill: false,
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
