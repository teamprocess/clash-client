import * as S from "@/features/home/ui/compare/growthrate/GrowRate.style";
import { getGrowthInfo, GrowthRateProps } from "@/features/home/model/useCompare";

export const GrowthRate = ({ yesterday, today }: GrowthRateProps) => {
  const { status, deg, value } = getGrowthInfo(yesterday, today);

  return (
    <S.GrowthWrapper>
      <S.GrowthValue $status={status as "up" | "down" | "same"}>
        {status === "same" ? (
          value
        ) : (
          <>
            <S.GrowthRateArrowIcon $deg={deg ?? 0} />
            {value}
          </>
        )}
      </S.GrowthValue>
    </S.GrowthWrapper>
  );
};
