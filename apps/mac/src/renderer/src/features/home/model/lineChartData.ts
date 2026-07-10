import type { VariationItem } from "@/entities/competition";

export const toLineChartData = (variations: VariationItem[]) => ({
  data: {
    labels: variations.map(v => v.month),
    values: variations.map(v => v.totalVariationPerMonth),
  },
});
