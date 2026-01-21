import * as S from "./ChapterPage.style";
import { Link } from "react-router-dom";
import { ChapterRanking } from "@/features/chapter-ranking";
import { SectionProgress } from "@/features/section-progress";
import { Roadmap } from "@/features/chapter/components/Roadmap";
import { QuizModal } from "@/features/chapter/components/QuizModal";
import { stagesData } from "@/features/chapter/mocks/missionData";
import { useChapter } from "@/features/chapter/model/useChapter";

const User = {
  currentSection: "리액트 초급",
};

export const ChapterPage = () => {
  const {
    chapterRef,
    roadmapNodes,
    currentStage,
    currentMission,
    modalOpen,
    setModalOpen,
    setCurrentMission,
    handleMissionClick,
    handleMissionComplete,
    handleSelectStage,
  } = useChapter(stagesData);

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
        <S.CurrentSectionLabel>{User.currentSection}</S.CurrentSectionLabel>
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
