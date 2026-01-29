import { DataPoint } from "@/entities/competition/model/rival-competition/compareRivals.types";

export const toLineChartData = (dataPoint: DataPoint[]) => ({
  dataPoint: {
    labels: dataPoint.map(v => v.date),
    values: dataPoint.map(v => v.point),
  },
});
