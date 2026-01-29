import { Line } from "react-chartjs-2";
import "chart.js/auto";

interface MyCompetitionLineChartProps {
  data: {
    dataPoint: {
      labels: string[];
      values: number[];
    };
  };
}

export const MyCompetitionLineChart = ({ data }: MyCompetitionLineChartProps) => {
  const labels = data.dataPoint.labels.map(v => v);
  const values = data.dataPoint.values.map(v => v);

  return (
    <Line
      data={{
        labels,
        datasets: [
          {
            data: values,
            borderWidth: 2,
            borderColor: "#0081CC",
            backgroundColor: "none",
            pointRadius: 8,
            pointHoverRadius: 9,
            pointBackgroundColor: "#0081CC",
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
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              color: "#A1A1A1",
            },
          },
          y: {
            display: false,
            grid: { display: false, color: "#3A3A3C" },
          },
        },
      }}
    />
  );
};
