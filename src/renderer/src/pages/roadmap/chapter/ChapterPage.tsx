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
    const mission = currentStage.missions.find(m => m.id === missionId); // 클릭한 missionId와 같은 미션을 찾음
    if (!mission || mission.completed) return;

    setCurrentMission(mission);
    setModalOpen(true);
  };

  const handleScroll = () => {
    if (!chapterRef.current) return;
    const container = chapterRef.current;

    // child: 스크롤 제한 계산을 위한 기준 요소
    const child = container.childNodes.item(0) as HTMLDivElement;

    // scrollTop: 위에서 얼마나 내려왔는지
    // offsetHeight: 현재 화면에 보이는 높이
    const scrolledSize = container.scrollTop + container.offsetHeight;

    // 아직 더 스크롤이 가능한지 판단
    // 전체 스크롤 높이에서 child의 width 만큼을 빼서
    // 로드맵이 깨지지 않는 안전 영역을 계산
    const canScroll = scrolledSize <= container.scrollHeight - child.offsetWidth;

    // 더 이상 내려가면 안 되는 위치를 넘었을 경우
    if (!canScroll) {
      // 스크롤을 강제로 허용된 최대 위치로 되돌림
      container.scrollTo(
        container.scrollWidth, // 가로 스크롤은 맨 끝
        container.scrollHeight - container.offsetHeight - child.offsetWidth // 여백
      );
    }
  };

  // 처음 화면이 로딩되었을 때 위치 고정(아래쪽으로 고정해놓음)
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
    // stages 상태를 이전 상태(prevStages)를 기준으로 안전하게 업데이트
    setStages(prevStages => {
      // 다음 스테이지 ID를 저장할 변수
      // (스테이지를 다 깼을 때만 값이 들어감)
      let nextStageId: number | null = null;

      // 모든 스테이지를 순회하면서
      // "현재 스테이지만" 수정하고 나머지는 그대로 유지
      const updated: Stage[] = prevStages.map((stage, index) => {
        // 현재 선택된 스테이지가 아니면 변경 없이 반환
        if (stage.id !== currentStageId) return stage;

        // 현재 스테이지의 미션들 중
        // 완료된 미션(missionId)만 completed: true 로 변경
        // (불변성 유지)
        const updatedMissions = stage.missions.map(m =>
          m.id === missionId ? { ...m, completed: true } : m
        );

        // 완료된 미션 개수 계산
        const completedCount = updatedMissions.filter(m => m.completed).length;

        // 모든 미션을 완료했는지 여부
        const isStageCompleted = completedCount === stage.totalMissions;

        // 스테이지를 모두 완료했다면
        // 다음 스테이지의 id를 저장
        if (isStageCompleted) {
          nextStageId = prevStages[index + 1]?.id ?? null;
        }

        // 스테이지 상태 결정
        // 전부 완료라면 -> completed
        // 아니면 기존 상태 유지
        const nextStatus: StageStatus = isStageCompleted ? "completed" : stage.status;

        // 변경된 스테이지 객체 반환
        return {
          ...stage, // 기존 스테이지 정보 유지
          missions: updatedMissions, // 업데이트된 미션 목록
          currentProgress: completedCount, // 진행도 갱신
          status: nextStatus, // 스테이지 상태 변경
        };
      });

      // 다음 스테이지가 존재한다면(현재 스테이지를 클리어했다면)
      if (nextStageId !== null) {
        // 화면에서 보여줄 현재 스테이지를 다음 스테이지로 변경
        setCurrentStageId(nextStageId);
        // 로드맵 UI 상태 업데이트
        setRoadmapNodes(prevNodes =>
          prevNodes.map(node => {
            // 기존 스테이지 -> completed
            if (node.id === currentStageId) {
              return { ...node, status: "completed" as const };
            }
            // 다음 스테이지 -> current
            if (node.id === nextStageId) {
              return { ...node, status: "current" as const };
            }
            return node;
          })
        );
      }
      // 최종적으로 업데이트된 stages 상태 반환
      return updated;
    });
  };

  const handleSelectStage = (stageId: number) => {
    // 클릭한 stageId에 해당하는 스테이지 데이터 찾기
    const stage = stages.find(s => s.id === stageId);
    // 로드맵에서 클릭한 노드 찾기
    const node = roadmapNodes.find(n => n.id === stageId);
    if (!stage || !node || node.status === "locked") return;
    // 현재 화면에 보여줄 스테이지를 클릭한 스테이지로 변경
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
