import { VariationItem } from "@/entities/home";

export const toLineChartData = (variations: VariationItem[]) => ({
  data: {
    labels: variations.map(v => v.month),
    values: variations.map(v => v.avgVariationPerMonth),
  },
});
