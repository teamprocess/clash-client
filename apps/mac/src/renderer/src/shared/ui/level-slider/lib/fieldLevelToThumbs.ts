import { LEVEL_ENUM } from "@/shared/ui/level-slider/types";

interface Thumb {
  step: number;
  isActive: boolean;
}
type FieldLevelToThumbsFunction = (level: LEVEL_ENUM, selectedLevel?: LEVEL_ENUM) => Thumb[];

export const fieldLevelToThumbs: FieldLevelToThumbsFunction = (
  level: LEVEL_ENUM,
  selectedLevel?: LEVEL_ENUM
) => {
  // 특정 field에 포함되는 thumbs 3개의 각 step을 저장
  let thumbs: Thumb[] = [];
  const absLevel = Math.abs(level);

  // level이 선택되지 않았을 때 고정값 return.
  if (selectedLevel == null) {
    if (absLevel === 0)
      thumbs = [
        { step: 2, isActive: false },
        { step: 1, isActive: true },
        { step: 2, isActive: false },
      ];
    if (absLevel === 1)
      thumbs = [
        { step: 3, isActive: false },
        { step: 4, isActive: false },
        { step: 5, isActive: false },
      ];
    if (absLevel === 2)
      thumbs = [
        { step: 6, isActive: false },
        { step: 7, isActive: false },
        { step: 8, isActive: false },
      ];
    return thumbs.toReversed();
  }

  const absSelectedLevel = Math.abs(selectedLevel);

  if (absLevel === 0) {
    // level이 0인 경우, 중앙 field라는 의미이므로 이에 해당하는 2, 1, 2로 설정한다.
    // 이때 selectedLevel에 따라 isActive를 조정한다. (step 1은 고정적으로 active하다)
    thumbs = [
      { step: 2, isActive: selectedLevel <= 0 },
      { step: 1, isActive: true },
      { step: 2, isActive: selectedLevel >= 0 },
    ];
  } else if (absLevel === 1) {
    // level이 -1이나 1인 경우, 이에 해당하는 3, 4, 5로 설정한다.
    // 이때 selectedLevel과 level을 비교해 본 field가 isActive인지 구한다.
    const isActive = Math.sign(level) === Math.sign(selectedLevel) && absLevel <= absSelectedLevel;
    thumbs = [
      { step: 3, isActive },
      { step: 4, isActive },
      { step: 5, isActive },
    ];
  } else if (absLevel === 2) {
    // level이 -2이나 2인 경우, 이에 해당하는 6, 7, 8로 설정한다.
    // 이때 selectedLevel과 level을 비교해 본 field가 isActive인지 구한다.
    const isActive = Math.sign(level) === Math.sign(selectedLevel) && absLevel <= absSelectedLevel;
    thumbs = [
      { step: 6, isActive },
      { step: 7, isActive },
      { step: 8, isActive },
    ];
  }

  // 만약 level이 음수일 경우, 레벨 슬라이더의 좌측에 해당하는 thumbs임으로 순서를 반전
  if (level < 0) {
    thumbs.reverse();
  }

  return thumbs;
};
