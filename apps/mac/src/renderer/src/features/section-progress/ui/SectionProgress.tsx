import * as S from "./SectionProgress.style";
import { useGetMyProfile } from "@/entities/user";
import { MajorEnum } from "@/entities/roadmap/section/model/section.types";
import { useMajorSectionQuery } from "@/entities/roadmap/section/api/query/useMajorSection.query";

interface SectionProgressProps {
  completed?: number;
  total?: number;
}

const resolveCount = (value: number | undefined, fallback: number) =>
  typeof value === "number" && Number.isFinite(value) ? Math.max(value, 0) : fallback;

export const SectionProgress = ({
  completed: completedProp,
  total: totalProp,
}: SectionProgressProps) => {
  const { data: myProfile } = useGetMyProfile();
  const major = myProfile?.major as MajorEnum;

  const { data: sectionData } = useMajorSectionQuery(major);
  const sections = sectionData?.sections ?? [];

  const total = resolveCount(totalProp, resolveCount(sectionData?.totalSections, sections.length));
  const completed = Math.min(
    resolveCount(
      completedProp,
      resolveCount(sectionData?.completedSections, sections.filter(section => section.completed).length)
    ),
    total
  );
  const percent =
    total === 0 ? 0 : Math.min(100, Math.max(0, Math.round((completed / total) * 100)));

  return (
    <S.SectionProgressContainer>
      <S.ProgressInfoBox>
        <S.RoadmapIcon />
        <S.StepCount>
          <S.CompletedCount>{completed}</S.CompletedCount> / {total}
        </S.StepCount>
      </S.ProgressInfoBox>
      <S.ProgressBarWrapper>
        <S.BarBackground>
          <S.BarActive $fill={percent} />
        </S.BarBackground>
        <S.PercentText>{percent}%</S.PercentText>
      </S.ProgressBarWrapper>
    </S.SectionProgressContainer>
  );
};
