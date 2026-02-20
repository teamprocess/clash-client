interface ChartData {
  data: {
    labels: number[];
    values: number[];
  };
}

export const formatChartDateData = (chartData: ChartData) => {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;

  const fullMonths = Array.from({ length: 12 }, (_, i) => {
    const month = currentMonth - 11 + i;
    return month <= 0 ? month + 12 : month;
  });

  const values = fullMonths.map(month => {
    const index = chartData.data.labels.indexOf(month);
    return index !== -1 ? Math.round(Number(chartData.data.values[index])) : 0;
  });

  return {
    labels: fullMonths,
    values,
  };
};
