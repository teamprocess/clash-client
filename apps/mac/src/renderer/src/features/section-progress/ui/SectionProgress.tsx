import * as S from "./SectionProgress.style";
import { useGetMyProfile } from "@/entities/user";
import { MajorEnum } from "@/entities/roadmap/section/model/section.types";
import { useMajorSectionQuery } from "@/entities/roadmap/section/api/query/useMajorSection.query";

export const SectionProgress = () => {
  const { data: myProfile } = useGetMyProfile();
  const major = myProfile?.major as MajorEnum;

  const { data: sectionData } = useMajorSectionQuery(major);
  const sections = sectionData?.sections ?? [];

  const total = sections.length;
  const completed = sections.filter(section => section.completed).length;
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
