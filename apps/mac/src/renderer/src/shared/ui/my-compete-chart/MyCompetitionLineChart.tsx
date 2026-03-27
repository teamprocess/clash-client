import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { formatTime } from "@/shared/lib";
import { AnalyzeCategory } from "@/entities/competition";

interface MyCompetitionLineChartProps {
  dataPoint: {
    labels: string[];
    values: number[];
  };
  category: AnalyzeCategory;
}

export const MyCompetitionLineChart = ({ dataPoint, category }: MyCompetitionLineChartProps) => {
  const labels = dataPoint.labels.map(label => {
    const [month, day] = label.split("-");
    return `${Number(month)}월 ${Number(day)}일`;
  });

  const values = dataPoint.values;

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
          tooltip: {
            backgroundColor: "#2A2B2C",
            borderColor: "#747678",
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
