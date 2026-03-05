import { Line } from "react-chartjs-2";
import "chart.js/auto";

interface ActiveLineChartProps {
  data: {
    labels: number[];
    values: number[];
  };
}

export const ActiveLineChart = ({ data }: ActiveLineChartProps) => {
  const labels = data.labels.map(v => `${v}월`);
  const values = data.values.map(v => v);

  return (
    <Line
      data={{
        labels,
        datasets: [
          {
            data: values,
            borderColor: "#747678",
            backgroundColor: "#DCDDDE",
            borderWidth: 2,
            pointRadius: 8,
            pointHoverRadius: 9,
            pointBackgroundColor: "#DCDDDE",
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
            backgroundColor: "#2A2B2C",
            borderColor: "#747678",
            borderWidth: 1,
            displayColors: false,
            callbacks: {
              title: () => "",
              label: tooltipItem => {
                const value = tooltipItem.raw;
                if (value === null || value === undefined) return "";
                return value.toString();
              },
            },
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
