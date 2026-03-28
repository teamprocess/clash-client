import * as S from "./LevelSliderLabels.style";
import { LEVEL_ENUM } from "@/shared/ui/level-slider/types";
import { Dispatch, SetStateAction } from "react";

interface LevelSliderProps {
  labels: string[];
  selectedLevel?: LEVEL_ENUM;
  hoverLevel?: LEVEL_ENUM;
  setHoverLevel: Dispatch<SetStateAction<LEVEL_ENUM | undefined>>;
}

export const LevelSliderLabels = ({ labels, selectedLevel, hoverLevel, setHoverLevel }: LevelSliderProps) => {
  return (
    <S.LevelSliderLabelsList>
      {labels.map((label, idx) => (
        // idx에 2를 빼 0~4를 -2~2 범위로 조정하여 selectedLevel과 비교한다.
        <S.LevelSliderLabelsItem
          key={idx}
          onMouseEnter={() => setHoverLevel(idx-2 as LEVEL_ENUM)}
          $isActive={(hoverLevel ?? selectedLevel) === idx - 2}
        >
          {label}
        </S.LevelSliderLabelsItem>
      ))}
    </S.LevelSliderLabelsList>
  );
};
