import * as S from "@/features/home/ui/compare/growth-rate/GrowRate.style";
import { getGrowthInfo } from "@/features/home/model/useCompare";

interface GrowthRateType {
  yesterday?: number;
  today?: number;
}

export const GrowthRate = ({ yesterday, today }: GrowthRateType) => {
  const { status, deg, value } = getGrowthInfo(yesterday ?? 0, today ?? 0);

  return (
    <S.GrowthWrapper>
      <S.GrowthValue $status={status as "up" | "down" | "same"}>
        {status === "same" ? (
          value
        ) : (
          <S.GrowthRateIconWrapper>
            <S.GrowthRateArrowIcon $deg={deg ?? 0} />
            {value}
          </S.GrowthRateIconWrapper>
        )}
      </S.GrowthValue>
    </S.GrowthWrapper>
  );
};
