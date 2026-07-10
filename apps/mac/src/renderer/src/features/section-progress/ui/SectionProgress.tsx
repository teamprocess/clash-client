import * as S from "./SectionProgress.style";
import { useGetMyProfile } from "@/entities/user";
import { MajorEnum, useMajorSectionQuery } from "@/entities/roadmap";
import { Button } from "@/shared/ui";

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
  const needsRemoteCounts = completedProp === undefined || totalProp === undefined;
  const profileQuery = useGetMyProfile();
  const { data: myProfile } = profileQuery;
  const major = needsRemoteCounts ? (myProfile?.major as MajorEnum) : MajorEnum.NONE;

  const sectionQuery = useMajorSectionQuery(major);
  const { data: sectionData } = sectionQuery;

  if (needsRemoteCounts && (profileQuery.isLoading || sectionQuery.isLoading)) {
    return (
      <S.SectionProgressContainer role="status" aria-live="polite">
        <S.StateContent>
          <S.StateMessage>진행률을 불러오는 중이에요.</S.StateMessage>
        </S.StateContent>
      </S.SectionProgressContainer>
    );
  }

  const hasInitialProfileError = profileQuery.isError && myProfile === undefined;
  const hasInitialSectionError = sectionQuery.isError && sectionData === undefined;

  if (needsRemoteCounts && (hasInitialProfileError || hasInitialSectionError)) {
    const retry = () => {
      if (hasInitialProfileError) {
        void profileQuery.refetch();
        return;
      }

      void sectionQuery.refetch();
    };

    return (
      <S.SectionProgressContainer role="alert">
        <S.StateContent>
          <S.StateMessage>진행률을 불러오지 못했어요.</S.StateMessage>
          <Button variant="primary" size="sm" onClick={retry}>
            다시 시도
          </Button>
        </S.StateContent>
      </S.SectionProgressContainer>
    );
  }

  if (needsRemoteCounts && (!major || major === MajorEnum.NONE)) {
    return (
      <S.SectionProgressContainer>
        <S.StateContent>
          <S.StateMessage>전공을 선택하면 진행률을 확인할 수 있어요.</S.StateMessage>
        </S.StateContent>
      </S.SectionProgressContainer>
    );
  }

  const sections = sectionData?.sections ?? [];

  const total = resolveCount(totalProp, resolveCount(sectionData?.totalSections, sections.length));
  const completed = Math.min(
    resolveCount(
      completedProp,
      resolveCount(
        sectionData?.completedSections,
        sections.filter(section => section.completed).length
      )
    ),
    total
  );
  const percent = total === 0 ? 0 : Math.floor((completed / total) * 100);

  return (
    <S.SectionProgressContainer>
      <S.ProgressInfoBox>
        <S.RoadmapIcon aria-hidden />
        <S.StepCount>
          <S.CompletedCount>{completed}</S.CompletedCount> / {total}
        </S.StepCount>
      </S.ProgressInfoBox>
      <S.ProgressBarWrapper>
        {total === 0 ? (
          <S.EmptyMessage>아직 진행할 항목이 없어요.</S.EmptyMessage>
        ) : (
          <>
            <S.BarBackground
              role="progressbar"
              aria-label="로드맵 진행률"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={percent}
            >
              <S.BarActive $fill={percent} />
            </S.BarBackground>
            <S.PercentText>{percent}%</S.PercentText>
          </>
        )}
      </S.ProgressBarWrapper>
    </S.SectionProgressContainer>
  );
};
