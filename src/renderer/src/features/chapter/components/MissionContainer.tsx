import * as S from "./MissionContainer.style";

interface Mission {
  id: number;
  title: string;
  completed: boolean;
}

interface CurrentStage {
  title: string;
  currentProgress: number;
  totalMissions: number;
  status: string;
}

interface MissionContainerProps {
  currentStage: CurrentStage;
  currentStageMissions: Mission[];
  onMissionClick: (id: number) => void;
}

export const MissionContainer = ({
  currentStage,
  currentStageMissions,
  onMissionClick,
}: MissionContainerProps) => {
  return (
    <S.MissionContainer>
      <S.MissionBoxTop>
        <S.MissionTitle>{currentStage.title}</S.MissionTitle>
        <S.MissionProgress>
          <S.MissionCurrentProgress>{currentStage.currentProgress}</S.MissionCurrentProgress>/
          <S.MissionTotalMissions>{currentStage.totalMissions}</S.MissionTotalMissions>
        </S.MissionProgress>
      </S.MissionBoxTop>
      <S.MissionList>
        {currentStageMissions.map(mission => (
          <S.MissionBox
            key={mission.id}
            onClick={() => {
              if (currentStage.status === "locked") return;
              onMissionClick(mission.id);
            }}
          >
            {mission.completed ? <S.CompletedLogo /> : <S.NotCompletedLogo />}
            <S.MissionLabel>{mission.title}</S.MissionLabel>
          </S.MissionBox>
        ))}
      </S.MissionList>
    </S.MissionContainer>
  );
};
