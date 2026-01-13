import * as S from "@/features/home/ui/compare/growth-rate/GrowRate.style";
import { getGrowthInfo, GrowthRateProps } from "@/features/home/model/useCompare";

export const GrowthRate = ({ yesterday, today }: GrowthRateProps) => {
  const { status, deg, value } = getGrowthInfo(yesterday, today);

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
