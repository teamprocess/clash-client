import * as S from "./LevelSliderTrack.style";
import { LevelSliderField } from "@/shared/ui/level-slider/level-slider-field/LevelSliderField";
import { DEFAULT_LEVELS } from "@/shared/ui/level-slider/constants";
import { LEVEL_ENUM } from "@/shared/ui/level-slider/types";
import { Dispatch, SetStateAction } from "react";

interface LevelSliderTrackProps {
  selectedLevel?: LEVEL_ENUM;
  hoverLevel?: LEVEL_ENUM;
  setHoverLevel: Dispatch<SetStateAction<LEVEL_ENUM | undefined>>;
  onSelectLevel: (value?: LEVEL_ENUM) => void;
}

export const LevelSliderTrack = ({ selectedLevel, hoverLevel, setHoverLevel, onSelectLevel }: LevelSliderTrackProps) => {
  return (
    <S.LevelSliderTrackWrapper>
      {DEFAULT_LEVELS.map((level, idx) => (
        <LevelSliderField
          key={idx}
          onMouseEnter={() => setHoverLevel(level)}
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
