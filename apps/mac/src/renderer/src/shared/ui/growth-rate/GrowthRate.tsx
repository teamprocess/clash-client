import * as S from "@/shared/ui/growth-rate/GrowRate.style";
import { getGrowthInfo } from "@/shared/lib";
import { formatTime } from "@/shared/lib";

interface GrowthRateProps {
  yesterday?: number;
  today?: number;
  studyState?: boolean;
}

export const GrowthRate = ({ yesterday, today, studyState }: GrowthRateProps) => {
  const { status, deg, value } = getGrowthInfo(yesterday ?? 0, today ?? 0);

  return (
    <S.GrowthWrapper>
      <S.GrowthValue $status={status as "up" | "down" | "same"}>
        {status === "same" ? (
          value
        ) : studyState === true ? (
          <S.GrowthRateIconWrapper>
            <S.GrowthRateArrowIcon $deg={deg ?? 0} />
            {formatTime(Number(value))}
          </S.GrowthRateIconWrapper>
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
