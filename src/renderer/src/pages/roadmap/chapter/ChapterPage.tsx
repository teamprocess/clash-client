import * as S from "./ChapterPage.style";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChapterRanking } from "@/features/chapter-ranking";
import { SectionProgress } from "@/features/section-progress";
import { Roadmap } from "@/features/chapter/components/Roadmap";
import { QuizModal } from "@/features/chapter/components/QuizModal";
import { Stage, Mission, stagesData, StageStatus } from "@/features/chapter/mocks/missionData";
import { roadmapNodes as initialRoadmapNodes } from "@/features/chapter/roadmapData";

const User = {
  currentSection: "리액트 초급",
};

export const ChapterPage = () => {
  const chapterRef = useRef<HTMLDivElement>(null);

  const [stages, setStages] = useState<Stage[]>(stagesData);
  const [roadmapNodes, setRoadmapNodes] = useState(initialRoadmapNodes);
  const [currentStageId, setCurrentStageId] = useState<number>(1);

  const [currentMission, setCurrentMission] = useState<Mission | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const currentStage = stages.find(stage => stage.id === currentStageId)!;

  const handleMissionClick = (missionId: number) => {
    const mission = currentStage.missions.find(m => m.id === missionId);
    if (!mission || mission.completed) return;

    setCurrentMission(mission);
    setModalOpen(true);
  };

  const handleScroll = () => {
    if (!chapterRef.current) return;

    const container = chapterRef.current;
    const child = container.childNodes.item(0) as HTMLDivElement;

    const scrolledSize = container.scrollTop + container.offsetHeight;
    const canScroll = scrolledSize <= container.scrollHeight - child.offsetWidth;

    if (!canScroll) {
      container.scrollTo(
        container.scrollWidth,
        container.scrollHeight - container.offsetHeight - child.offsetWidth
      );
    }
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

  const handleMissionComplete = (missionId: number) => {
    setStages(prevStages => {
      let nextStageId: number | null = null;

      const updated: Stage[] = prevStages.map((stage, index) => {
        if (stage.id !== currentStageId) return stage;

        const updatedMissions = stage.missions.map(m =>
          m.id === missionId ? { ...m, completed: true } : m
        );

        const completedCount = updatedMissions.filter(m => m.completed).length;
        const isStageCompleted = completedCount === stage.totalMissions;

        if (isStageCompleted) {
          nextStageId = prevStages[index + 1]?.id ?? null;
        }

        const nextStatus: StageStatus = isStageCompleted ? "completed" : stage.status;

        return {
          ...stage,
          missions: updatedMissions,
          currentProgress: completedCount,
          status: nextStatus,
        };
      });

      if (nextStageId !== null) {
        setCurrentStageId(nextStageId);

        setRoadmapNodes(prevNodes =>
          prevNodes.map(node => {
            if (node.id === currentStageId) {
              return { ...node, status: "completed" as const };
            }
            if (node.id === nextStageId) {
              return { ...node, status: "current" as const };
            }
            return node;
          })
        );
      }

      return updated;
    });
  };

  const handleSelectStage = (stageId: number) => {
    const stage = stages.find(s => s.id === stageId);
    const node = roadmapNodes.find(n => n.id === stageId);
    if (!stage || !node || node.status === "locked") return;
    setCurrentStageId(stageId);
  };

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
