import * as S from "./LevelSliderLabels.style";
import { LEVEL_ENUM } from "@/shared/ui/level-slider/types";
import { Dispatch, SetStateAction } from "react";

interface LevelSliderLabelsProps {
  labels: string[];
  selectedLevel?: LEVEL_ENUM;
  setHoverLevel: Dispatch<SetStateAction<LEVEL_ENUM | undefined>>;
  onSelectLevel: (value?: LEVEL_ENUM) => void;
}

export const LevelSliderLabels = ({ labels, selectedLevel, setHoverLevel, onSelectLevel }: LevelSliderLabelsProps) => {
  return (
    <S.LevelSliderLabelsList>
      {labels.map((label, idx) => {
        const level = (idx - 2) as LEVEL_ENUM;
        return (
          // idx에 2를 빼 0~4를 -2~2 범위로 조정하여 selectedLevel과 비교한다.
          <S.LevelSliderLabelsItem
            key={idx}
            onMouseEnter={() => setHoverLevel(level)}
            // 현재 선택된 레벨을 다시 클릭할 시 undefined로 변경 (선택 해제)
            onClick={() => onSelectLevel(level === selectedLevel ? undefined : level)}
            $isActive={selectedLevel === level}
          >
            {label}
          </S.LevelSliderLabelsItem>
        );
      })}
    </S.LevelSliderLabelsList>
  );
};
