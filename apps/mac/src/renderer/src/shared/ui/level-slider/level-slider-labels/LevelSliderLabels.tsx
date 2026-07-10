import * as S from "./LevelSliderLabels.style";
import type { LevelSliderValue } from "@/shared/ui/level-slider/types";
import type { Dispatch, SetStateAction } from "react";

interface LevelSliderLabelsProps {
  labels: string[];
  selectedLevel?: LevelSliderValue;
  setHoverLevel: Dispatch<SetStateAction<LevelSliderValue | undefined>>;
  onSelectLevel: (value?: LevelSliderValue) => void;
}

export const LevelSliderLabels = ({
  labels,
  selectedLevel,
  setHoverLevel,
  onSelectLevel,
}: LevelSliderLabelsProps) => {
  return (
    <S.LevelSliderLabelsList>
      {labels.map((label, idx) => {
        const level = (idx - 2) as LevelSliderValue;
        return (
          // idx에 2를 빼 0~4를 -2~2 범위로 조정하여 selectedLevel과 비교한다.
          <S.LevelSliderLabelsItem key={idx}>
            <S.LevelSliderLabelButton
              type="button"
              aria-pressed={selectedLevel === level}
              onMouseEnter={() => setHoverLevel(level)}
              onMouseLeave={() => setHoverLevel(undefined)}
              onFocus={() => setHoverLevel(level)}
              onBlur={() => setHoverLevel(undefined)}
              // 현재 선택된 레벨을 다시 클릭할 시 undefined로 변경 (선택 해제)
              onClick={() => onSelectLevel(level === selectedLevel ? undefined : level)}
              $isActive={selectedLevel === level}
            >
              {label}
            </S.LevelSliderLabelButton>
          </S.LevelSliderLabelsItem>
        );
      })}
    </S.LevelSliderLabelsList>
  );
};
