import * as S from "./ChapterPage.style";
import { useEffect, useRef, useState } from "react";
import { ChapterRanking } from "@/features/chapter-ranking";
import { SectionProgress } from "@/features/section-progress";
import { Link } from "react-router-dom";
import { Roadmap } from "@/features/chapter/components/Roadmap";
import { Stage, stagesData } from "@/features/chapter/mocks/missionData";
import { QuizModal } from "@/features/chapter/components/QuizModal";

const User = {
  currentSection: "리액트 초급",
};

export const ChapterPage = () => {
  const chapterRef = useRef<HTMLDivElement>(null);
  const [currentStage, setCurrentStage] = useState<Stage>(stagesData[0]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleMissionClick = (completed: boolean) => {
    if (completed) return;
    setModalOpen(true);
  };

  const handleScroll = () => {
    if (!chapterRef.current) return;
    const child = chapterRef.current.childNodes.item(0) as HTMLDivElement;
    const scrolledSize = chapterRef.current.scrollTop + chapterRef.current.offsetHeight;

    const canScroll = scrolledSize <= chapterRef.current.scrollHeight - child.offsetWidth;
    if (!canScroll)
      chapterRef.current.scrollTo(
        chapterRef.current.scrollWidth,
        chapterRef.current.scrollHeight - chapterRef.current.offsetHeight - child.offsetWidth
      );
  };

  useEffect(() => {
    if (!chapterRef.current) return;
    chapterRef.current.scrollTo(chapterRef.current.scrollWidth, chapterRef.current.scrollHeight);
  }, []);

  useEffect(() => {
    if (!chapterRef.current) return;
    const chapter = chapterRef.current;
    chapter.addEventListener("scroll", handleScroll);
    return () => {
      chapter.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <S.ChapterContainer>
      <S.ChapterScrollable ref={chapterRef}>
        {Array(300)
          .fill(null)
          .map((_, idx) => (
            <S.Square key={idx} />
          ))}
        <S.RoadmapWrapper>
          <Roadmap stageSetFn={setCurrentStage} />
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
            <S.MissionBox key={mission.id} onClick={() => handleMissionClick(mission.completed)}>
              {mission.completed ? <S.CompletedLogo /> : <S.NotCompletedLogo />}
              <S.MissionLabel>{mission.title}</S.MissionLabel>
            </S.MissionBox>
          ))}
        </S.MissionList>
      </S.MissionContainer>

      <QuizModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        currentStage={currentStage}
      />
    </S.ChapterContainer>
  );
};
