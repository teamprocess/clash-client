import * as S from "./LevelSlider.style";
import { LevelSliderTrack } from "@/shared/ui/level-slider/level-slider-track/LevelSliderTrack";
import { useState } from "react";
import type { LevelSliderValue } from "@/shared/ui/level-slider/types";

interface LevelSliderProps {
  labels: string[];
  selectedLevel?: LevelSliderValue;
  onChange?: (value?: LevelSliderValue) => void;
}

export const LevelSlider = ({ labels, selectedLevel, onChange }: LevelSliderProps) => {
  const [hoverLevel, setHoverLevel] = useState<LevelSliderValue | undefined>(undefined);

  const handleSelectLevel = (value?: LevelSliderValue) => {
    onChange?.(value);
  };

  return (
    <S.LevelSliderWrapper onMouseLeave={() => setHoverLevel(undefined)}>
      <LevelSliderTrack
        labels={labels}
        hoverLevel={hoverLevel}
        setHoverLevel={setHoverLevel}
        selectedLevel={selectedLevel}
        onSelectLevel={handleSelectLevel}
      />
    </S.LevelSliderWrapper>
  );
};
