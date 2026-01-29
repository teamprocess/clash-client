import { MyDataPoint } from "@/entities/competition/model/my-competition/myCompetition.types";

export const toLineChartData = (dataPoint: MyDataPoint[]) => ({
  dataPoint: {
    labels: dataPoint.map(v => v.date),
    values: dataPoint.map(v => v.rate),
  },
});
