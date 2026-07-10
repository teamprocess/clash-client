import * as S from "./LevelSliderTrack.style";
import { LevelSliderField } from "@/shared/ui/level-slider/level-slider-field/LevelSliderField";
import { DEFAULT_LEVELS } from "@/shared/ui/level-slider/constants";
import type { LevelSliderValue } from "@/shared/ui/level-slider/types";
import type { Dispatch, SetStateAction } from "react";

interface LevelSliderTrackProps {
  labels: string[];
  selectedLevel?: LevelSliderValue;
  hoverLevel?: LevelSliderValue;
  setHoverLevel: Dispatch<SetStateAction<LevelSliderValue | undefined>>;
  onSelectLevel: (value?: LevelSliderValue) => void;
}

export const LevelSliderTrack = ({
  labels,
  selectedLevel,
  hoverLevel,
  setHoverLevel,
  onSelectLevel,
}: LevelSliderTrackProps) => {
  return (
    <S.LevelSliderTrackWrapper role="group" aria-label="응답 강도 그래프">
      {DEFAULT_LEVELS.map((level, idx) => (
        <LevelSliderField
          key={idx}
          label={labels[idx] ?? `${idx + 1}단계`}
          onMouseEnter={() => setHoverLevel(level)}
          onMouseLeave={() => setHoverLevel(undefined)}
          // 현재 선택된 레벨을 다시 클릭할 시 undefined로 변경 (선택 해제)
          onClick={() => onSelectLevel(level === selectedLevel ? undefined : level)}
          level={level}
          selectedLevel={selectedLevel}
          hoverLevel={hoverLevel}
        />
      ))}
    </S.LevelSliderTrackWrapper>
  );
};
