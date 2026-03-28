import * as S from "./LevelSlider.style";
import { LevelSliderTrack } from "@/shared/ui/level-slider/level-slider-track/LevelSliderTrack";
import { LevelSliderLabels } from "@/shared/ui/level-slider/level-slider-labels/LevelSliderLabels";
import { useState } from "react";
import { LEVEL_ENUM } from "@/shared/ui/level-slider/types";

interface LevelSliderProps {
  labels: string[];
  selectedLevel?: LEVEL_ENUM;
  onChange?: (value?: LEVEL_ENUM) => void;
}

export const LevelSlider = ({ labels, selectedLevel, onChange }: LevelSliderProps) => {
  const [hoverLevel, setHoverLevel] = useState<LEVEL_ENUM | undefined>(undefined);

  const handleSelectLevel = (value?: LEVEL_ENUM) => {
    onChange?.(value);
  };

  return (
    <S.LevelSliderWrapper onMouseLeave={() => setHoverLevel(undefined)}>
      <LevelSliderTrack
        hoverLevel={hoverLevel}
        setHoverLevel={setHoverLevel}
        selectedLevel={selectedLevel}
        onSelectLevel={handleSelectLevel}
      />
      <LevelSliderLabels
        setHoverLevel={setHoverLevel}
        selectedLevel={selectedLevel}
        onSelectLevel={handleSelectLevel}
        labels={labels}
      />
    </S.LevelSliderWrapper>
  );
};
