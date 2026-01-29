import { Line } from "react-chartjs-2";
import "chart.js/auto";

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
            display: true, // 멀티면 label 보여주는 게 좋음
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
