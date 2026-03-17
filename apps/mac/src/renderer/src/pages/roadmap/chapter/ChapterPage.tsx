import * as S from "./ChapterPage.style";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ChapterRanking } from "@/features/chapter-ranking";
import { SectionProgress } from "@/features/section-progress";
import { Roadmap } from "@/features/chapter/components/Roadmap";
import { useChapter } from "@/features/chapter/model/useChapter";
import { MajorEnum } from "@/entities/roadmap/section/model/section.types";
import { useEffect, useMemo } from "react";
import { useGetMyProfile } from "@/entities/user";
import { useMajorSectionQuery } from "@/entities/roadmap/section/api/query/useMajorSection.query";
import { MissionContainer } from "@/features/chapter/components/MissionContainer";

export const ChapterPage = () => {
  const { sectionId } = useParams<{ sectionId: string }>();
  const numericSectionId = sectionId ? Number(sectionId) : 0;

  const { chapterRef, domain, view, handlers } = useChapter(numericSectionId);

  const { data: myProfile } = useGetMyProfile();
  const major = myProfile?.major as MajorEnum;

  const { data: sectionData } = useMajorSectionQuery(major);

  const navigate = useNavigate();

  useEffect(() => {
    if (major == MajorEnum.NONE) navigate("/roadmap/major-choice");
  }, [major, navigate]);

  const orderedSections = useMemo(() => {
    if (!sectionData) return [];

    const { categories, sections } = sectionData;
    const byCategory = categories.flatMap(category =>
      sections.filter(section => section.categoryId === category)
    );
    const remaining = sections.filter(section => !categories.includes(section.categoryId));

    return [...byCategory, ...remaining];
  }, [sectionData]);

  const { prevSection, nextSection } = useMemo(() => {
    const currentIndex = orderedSections.findIndex(section => section.id === numericSectionId);
    if (currentIndex === -1) {
      return { prevSection: null, nextSection: null };
    }

    return {
      prevSection: orderedSections[currentIndex - 1] ?? null,
      nextSection: orderedSections[currentIndex + 1] ?? null,
    };
  }, [numericSectionId, orderedSections]);

  const handlePrevSection = () => {
    if (!prevSection || prevSection.locked) return;
    navigate(`/roadmap/${prevSection.id}`);
  };

  const handleNextSection = () => {
    if (!nextSection || nextSection.locked) return;
    navigate(`/roadmap/${nextSection.id}`);
  };

  if (!sectionId || isNaN(numericSectionId) || numericSectionId === 0) {
    return (
      <S.ChapterContainer>
        <div>잘못된 섹션 ID입니다.</div>
        <Link to="/roadmap">로드맵으로 돌아가기</Link>
      </S.ChapterContainer>
    );
  }

  if (domain.loading) {
    return (
      <S.ChapterContainer>
        <S.ChapterScrollable>
          <S.ChapterCanvas>
            <S.RoadmapStageArea>
              <S.LoadingRoadmapWrapper>
                <S.LoadingRoadmapPath $top="9rem" $left="9rem" $width="12rem" $rotate="-22deg" />
                <S.LoadingRoadmapPath $top="16rem" $left="18rem" $width="10rem" $rotate="18deg" />
                <S.LoadingRoadmapPath $top="24rem" $left="10rem" $width="14rem" $rotate="-12deg" />
                <S.LoadingRoadmapPath $top="30rem" $left="22rem" $width="11rem" $rotate="22deg" />
                <S.LoadingRoadmapPath $top="40rem" $left="12rem" $width="12rem" $rotate="-10deg" />
                <S.LoadingRoadmapPath $top="48rem" $left="24rem" $width="10rem" $rotate="28deg" />

                <S.LoadingRoadmapNode $top="6rem" $left="6rem" />
                <S.LoadingRoadmapNode $top="12rem" $left="18rem" />
                <S.LoadingRoadmapNode $top="20rem" $left="26rem" />
                <S.LoadingRoadmapNode $top="27rem" $left="12rem" />
                <S.LoadingRoadmapNode $top="34rem" $left="24rem" />
                <S.LoadingRoadmapNode $top="44rem" $left="14rem" />
                <S.LoadingRoadmapNode $top="52rem" $left="30rem" />
              </S.LoadingRoadmapWrapper>
            </S.RoadmapStageArea>
          </S.ChapterCanvas>
        </S.ChapterScrollable>

        <S.LoadingRankingContainer>
          <S.LoadingSkeleton $width="7rem" $height="1.6rem" />
          <S.LoadingRankingTop3>
            <S.LoadingRankingPodium>
              <S.LoadingSkeleton $width="3.6rem" $height="3.6rem" $radius="999px" />
              <S.LoadingSkeleton $width="2.8rem" $height="0.8rem" />
              <S.LoadingSkeleton $width="2.2rem" $height="0.7rem" />
            </S.LoadingRankingPodium>
            <S.LoadingRankingPodium>
              <S.LoadingSkeleton $width="4.2rem" $height="4.2rem" $radius="999px" />
              <S.LoadingSkeleton $width="3rem" $height="0.9rem" />
              <S.LoadingSkeleton $width="2.4rem" $height="0.7rem" />
            </S.LoadingRankingPodium>
            <S.LoadingRankingPodium>
              <S.LoadingSkeleton $width="3.6rem" $height="3.6rem" $radius="999px" />
              <S.LoadingSkeleton $width="2.8rem" $height="0.8rem" />
              <S.LoadingSkeleton $width="2.2rem" $height="0.7rem" />
            </S.LoadingRankingPodium>
          </S.LoadingRankingTop3>
          <S.LoadingRankingList>
            {Array.from({ length: 5 }).map((_, idx) => (
              <S.LoadingRankingItem key={idx}>
                <S.LoadingSkeleton $width="7rem" $height="1rem" />
                <S.LoadingSkeleton $width="2.5rem" $height="0.9rem" />
              </S.LoadingRankingItem>
            ))}
          </S.LoadingRankingList>
        </S.LoadingRankingContainer>

        <S.LoadingPreviousBox>
          <S.LoadingSkeleton $width="2rem" $height="2rem" $radius="999px" />
          <S.LoadingSkeleton $width="7rem" $height="1.7rem" />
        </S.LoadingPreviousBox>

        <S.LoadingCurrentSectionBox>
          <S.LoadingSkeleton $width="2rem" $height="2rem" $radius="999px" />
          <S.LoadingSkeleton $width="12rem" $height="2rem" />
          <S.LoadingSkeleton $width="2rem" $height="2rem" $radius="999px" />
        </S.LoadingCurrentSectionBox>

        <S.LoadingSectionProgress>
          <S.LoadingProgressInfo>
            <S.LoadingSkeleton $width="2rem" $height="2rem" $radius="0.35rem" />
            <S.LoadingSkeleton $width="6rem" $height="1.5rem" />
          </S.LoadingProgressInfo>
          <S.LoadingProgressBar>
            <S.LoadingSkeleton $width="100%" $height="0.5rem" $radius="999px" />
            <S.LoadingSkeleton $width="3rem" $height="1.5rem" />
          </S.LoadingProgressBar>
        </S.LoadingSectionProgress>
      </S.ChapterContainer>
    );
  }

  if (domain.error) {
    return (
      <S.ChapterContainer>
        <div>데이터를 불러올 수 없습니다: {domain.error}</div>
        <Link to="/roadmap">로드맵으로 돌아가기</Link>
      </S.ChapterContainer>
    );
  }

  return (
    <S.ChapterContainer>
      <S.ChapterScrollable ref={chapterRef}>
        <S.ChapterCanvas>
          <S.RoadmapStageArea>
            {domain.roadmapNodes.length > 0 ? (
              <S.RoadmapWrapper>
                <Roadmap nodes={domain.roadmapNodes} onSelectStage={handlers.handleSelectStage} />
              </S.RoadmapWrapper>
            ) : (
              <S.EmptyRoadmapMessage>아직 등록된 챕터가 없습니다.</S.EmptyRoadmapMessage>
            )}
          </S.RoadmapStageArea>
        </S.ChapterCanvas>
      </S.ChapterScrollable>

      <ChapterRanking page="chapter" />
      <SectionProgress completed={domain.completedChapters} total={domain.totalChapters} />

      <Link to="/roadmap">
        <S.PreviousBox>
          <S.PreviousIcon />
          <S.PreviousLabel>이전으로</S.PreviousLabel>
        </S.PreviousBox>
      </Link>

      <S.CurrentSectionBox>
        <S.ArrowButton
          onClick={handlePrevSection}
          $disabled={!prevSection || prevSection.locked}
          disabled={!prevSection || prevSection.locked}
          aria-label="이전 섹션"
        >
          <S.ArrowIcon $direction="left" />
        </S.ArrowButton>
        <S.CurrentSectionLabel>{domain.sectionTitle}</S.CurrentSectionLabel>
        <S.ArrowButton
          onClick={handleNextSection}
          $disabled={!nextSection || nextSection.locked}
          disabled={!nextSection || nextSection.locked}
          aria-label="다음 섹션"
        >
          <S.ArrowIcon $direction="right" />
        </S.ArrowButton>
      </S.CurrentSectionBox>

      {view.missionModalOpen && (
        <MissionContainer
          isOpen={view.missionModalOpen}
          currentStage={domain.currentStage}
          currentMission={view.currentMission}
          currentMissionStageTitle={view.currentMissionStageTitle}
          description={
            domain.currentStageDetailsError
              ? "챕터 설명을 불러오지 못했습니다. 잠시 후 다시 확인해주세요."
              : domain.currentStageDescription
          }
          isLoading={domain.currentStageDetailsLoading}
          isSolveDisabled={
            domain.currentStageMissionsLoading || domain.currentStageMissions.length === 0
          }
          studyMaterialUrl={domain.currentStageStudyMaterialUrl}
          onClose={handlers.handleCloseMissionPanel}
          onBackToOverview={handlers.handleCloseQuizModal}
          onSolve={handlers.handleStartCurrentStageMission}
          onMissionComplete={handlers.handleMissionComplete}
        />
      )}
    </S.ChapterContainer>
  );
};
