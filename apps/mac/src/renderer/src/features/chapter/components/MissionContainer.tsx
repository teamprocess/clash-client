import * as S from "./MissionContainer.style";
import { useEffect, useRef, useState } from "react";

const CLOSE_ANIMATION_MS = 220;

interface CurrentStageMeta {
  title: string;
  currentProgress: number;
  totalMissions: number;
}

interface MissionContainerProps {
  currentStage: CurrentStageMeta;
  description: string | null;
  isLoading: boolean;
  isSolveDisabled: boolean;
  onClose: () => void;
  onSolve: () => void;
}

export const MissionContainer = ({
  currentStage,
  description,
  isLoading,
  isSolveDisabled,
  onClose,
  onSolve,
}: MissionContainerProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const closeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current !== null) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const handleRequestClose = () => {
    if (isClosing) return;

    setIsClosing(true);
    closeTimeoutRef.current = window.setTimeout(() => {
      onClose();
    }, CLOSE_ANIMATION_MS);
  };

  const descriptionText = isLoading
    ? "챕터 정보를 불러오는 중입니다."
    : description?.trim() || "이 챕터에 대한 설명이 아직 준비되지 않았습니다.";
  const progressPercent =
    currentStage.totalMissions > 0
      ? Math.min((currentStage.currentProgress / currentStage.totalMissions) * 100, 100)
      : 0;
  const segmentCount = Math.max(currentStage.totalMissions, 1);
  const tickPositions = Array.from({ length: Math.max(segmentCount - 1, 0) }, (_, index) => {
    return ((index + 1) / segmentCount) * 100;
  });

  return (
    <S.MissionContainer $closing={isClosing} onClick={handleRequestClose}>
      <S.Panel $closing={isClosing} onClick={event => event.stopPropagation()}>
        <S.PanelHeader>
          <S.HeaderContent>
            <S.PanelEyebrow>챕터 정보</S.PanelEyebrow>
            <S.MissionTitle>{currentStage.title}</S.MissionTitle>
            <S.ProgressRow>
              <S.ProgressLabel>진행도</S.ProgressLabel>
              <S.ProgressValue>
                <S.ProgressAccent>{currentStage.currentProgress}</S.ProgressAccent>/
                {currentStage.totalMissions}
              </S.ProgressValue>
            </S.ProgressRow>
            <S.ProgressTrack aria-hidden>
              <S.ProgressFill $value={progressPercent} />
              <S.ProgressTicks>
                {tickPositions.map(position => (
                  <S.ProgressTick key={position} style={{ left: `${position}%` }} />
                ))}
              </S.ProgressTicks>
            </S.ProgressTrack>
          </S.HeaderContent>
          <S.CloseButton type="button" onClick={handleRequestClose} aria-label="챕터 패널 닫기">
            <S.CloseIcon aria-hidden />
          </S.CloseButton>
        </S.PanelHeader>

        <S.PanelBody>
          <S.DescriptionCard>
            <S.MissionDescription>{descriptionText}</S.MissionDescription>
          </S.DescriptionCard>
        </S.PanelBody>

        <S.PanelFooter>
          <S.ActionButton variant="primary" size="lg" fullWidth>
            학습하러 가기
          </S.ActionButton>
          <S.ActionButton
            variant="secondary"
            size="lg"
            fullWidth
            onClick={onSolve}
            disabled={isSolveDisabled}
          >
            문제 풀러 가기
          </S.ActionButton>
        </S.PanelFooter>
      </S.Panel>
    </S.MissionContainer>
  );
};
