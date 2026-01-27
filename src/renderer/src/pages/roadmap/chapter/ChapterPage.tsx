import * as S from "./ChapterPage.style";
import { Link, useParams } from "react-router-dom";
import { ChapterRanking } from "@/features/chapter-ranking";
import { SectionProgress } from "@/features/section-progress";
import { Roadmap } from "@/features/chapter/components/Roadmap";
import { QuizModal } from "@/features/chapter/components/QuizModal";
import { useChapter } from "@/features/chapter/model/useChapter";

export const ChapterPage = () => {
  const { sectionId } = useParams<{ sectionId: string }>();
  const numericSectionId = sectionId ? Number(sectionId) : 0;

  const {
    chapterRef,
    roadmapNodes,
    currentStage,
    currentMission,
    modalOpen,
    loading,
    error,
    sectionTitle,
    setModalOpen,
    setCurrentMission,
    handleMissionClick,
    handleMissionComplete,
    handleSelectStage,
  } = useChapter(numericSectionId);

  if (!sectionId || isNaN(numericSectionId) || numericSectionId === 0) {
    return (
      <S.ChapterContainer>
        <div>잘못된 섹션 ID입니다.</div>
        <Link to="/roadmap">로드맵으로 돌아가기</Link>
      </S.ChapterContainer>
    );
  }

  if (loading) {
    return (
      <S.ChapterContainer>
        <div>로딩 중...</div>
      </S.ChapterContainer>
    );
  }

  if (error) {
    return (
      <S.ChapterContainer>
        <div>데이터를 불러올 수 없습니다: {error}</div>
        <Link to="/roadmap">로드맵으로 돌아가기</Link>
      </S.ChapterContainer>
    );
  }

  return (
    <S.ChapterContainer>
      <S.ChapterScrollable ref={chapterRef}>
        {Array.from({ length: 300 }).map((_, idx) => (
          <S.Square key={idx} />
        ))}

        <S.RoadmapWrapper>
          <Roadmap nodes={roadmapNodes} onSelectStage={handleSelectStage} />
        </S.RoadmapWrapper>
      </S.ChapterScrollable>

      <ChapterRanking page="chapter" />
      <SectionProgress />

      <Link to="/roadmap">
        <S.PreviousBox>
          <S.PreviousIcon />
          <S.PreviousLabel>이전으로</S.PreviousLabel>
        </S.PreviousBox>
      </Link>

      <S.CurrentSectionBox>
        <S.ArrowIcon $direction="left" />
        <S.CurrentSectionLabel>{sectionTitle}</S.CurrentSectionLabel>
        <S.ArrowIcon $direction="right" />
      </S.CurrentSectionBox>

      <S.MissionContainer>
        <S.MissionBoxTop>
          <S.MissionTitle>{currentStage.title}</S.MissionTitle>
          <S.MissionProgress>
            <S.MissionCurrentProgress>{currentStage.currentProgress}</S.MissionCurrentProgress>/
            <S.MissionTotalMissions>{currentStage.totalMissions}</S.MissionTotalMissions>
          </S.MissionProgress>
        </S.MissionBoxTop>

        <S.MissionList>
          {currentStage.missions.map(mission => (
            <S.MissionBox
              key={mission.id}
              onClick={() => {
                if (currentStage.status === "locked") return;
                handleMissionClick(mission.id);
              }}
            >
              {mission.completed ? <S.CompletedLogo /> : <S.NotCompletedLogo />}
              <S.MissionLabel>{mission.title}</S.MissionLabel>
            </S.MissionBox>
          ))}
        </S.MissionList>
      </S.MissionContainer>

      {currentMission && (
        <QuizModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setCurrentMission(null);
          }}
          currentMission={currentMission}
          onMissionComplete={handleMissionComplete}
        />
      )}
    </S.ChapterContainer>
  );
};
