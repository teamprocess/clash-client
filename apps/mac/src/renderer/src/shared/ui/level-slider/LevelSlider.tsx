import * as S from "./LevelSlider.style";
import { LevelSliderTrack } from "@/shared/ui/level-slider/level-slider-track/LevelSliderTrack";
import { LevelSliderLabels } from "@/shared/ui/level-slider/level-slider-labels/LevelSliderLabels";

interface LevelSliderProps {
  labels: string[];
}

export const LevelSlider = ({ labels }: LevelSliderProps) => {
  return (
    <S.LevelSliderWrapper>
      <LevelSliderTrack />
      <LevelSliderLabels labels={labels} />
    </S.LevelSliderWrapper>
  );
};
