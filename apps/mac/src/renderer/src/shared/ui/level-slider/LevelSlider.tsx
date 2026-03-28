import * as S from "./LevelSlider.style";
import { LevelSliderTrack } from "@/shared/ui/level-slider/level-slider-track/LevelSliderTrack";
import { LevelSliderLabels } from "@/shared/ui/level-slider/level-slider-labels/LevelSliderLabels";
import { useState } from "react";
import { LEVEL_ENUM } from "@/shared/ui/level-slider/types";

interface LevelSliderProps {
  labels: string[];
}

export const LevelSlider = ({ labels }: LevelSliderProps) => {
  const [hoverLevel, setHoverLevel] = useState<LEVEL_ENUM | undefined>(undefined);
  const selectedLevel = undefined;
  return (
    <S.LevelSliderWrapper onMouseLeave={() => setHoverLevel(undefined)}>
      <LevelSliderTrack hoverLevel={hoverLevel} setHoverLevel={setHoverLevel} selectedLevel={selectedLevel} />
      <LevelSliderLabels hoverLevel={hoverLevel} setHoverLevel={setHoverLevel} selectedLevel={selectedLevel} labels={labels} />
    </S.LevelSliderWrapper>
  );
};
