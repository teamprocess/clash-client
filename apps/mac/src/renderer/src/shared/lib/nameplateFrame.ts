import { css } from "styled-components";

export interface NameplateFrameProps {
  $image?: string;
}

type NameplateOverlayValue = string | number;

export interface NameplateOverlayTuning {
  insetX?: NameplateOverlayValue;
  leftInset?: NameplateOverlayValue;
  rightInset?: NameplateOverlayValue;
  scaleX?: NameplateOverlayValue;
  scaleY?: NameplateOverlayValue;
  shiftX?: NameplateOverlayValue;
  shiftY?: NameplateOverlayValue;
  origin?: string;
}

const buildOverlayVariable = (name: string, value?: NameplateOverlayValue) => {
  if (value === undefined) {
    return "";
  }

  return `${name}: ${String(value)};`;
};

// 화면별 프리셋은 이 헬퍼로 선언해서 어떤 축을 조절하는지 바로 읽히게 한다.
export const createNameplateOverlayTuningCss = (tuning: NameplateOverlayTuning) => css`
  ${buildOverlayVariable("--nameplate-image-inset-x", tuning.insetX)}
  ${buildOverlayVariable("--nameplate-image-left-inset", tuning.leftInset)}
  ${buildOverlayVariable("--nameplate-image-right-inset", tuning.rightInset)}
  ${buildOverlayVariable("--nameplate-image-scale-x", tuning.scaleX)}
  ${buildOverlayVariable("--nameplate-image-scale-y", tuning.scaleY)}
  ${buildOverlayVariable("--nameplate-image-shift-x", tuning.shiftX)}
  ${buildOverlayVariable("--nameplate-image-shift-y", tuning.shiftY)}
  ${tuning.origin ? `--nameplate-image-origin: ${tuning.origin};` : ""}
`;

// CSS 변수로 화면별 스케일/위치를 조정할 수 있는 공통 이름표 오버레이.
export const nameplateFrameCss = css<NameplateFrameProps>`
  position: relative;
  box-sizing: border-box;

  ${({ $image }) =>
    $image
      ? css`
          &::before {
            content: "";
            position: absolute;
            left: var(--nameplate-image-left-inset, var(--nameplate-image-inset-x, 0rem));
            right: var(--nameplate-image-right-inset, var(--nameplate-image-inset-x, 0rem));
            top: 0;
            bottom: 0;
            background-image: url(${$image});
            background-size: 100% 100%;
            background-position: center center;
            background-repeat: no-repeat;
            pointer-events: none;
            z-index: 1;
            transform-origin: var(--nameplate-image-origin, center bottom);
            transform:
              translateX(var(--nameplate-image-shift-x, 0rem))
              translateY(var(--nameplate-image-shift-y, 0rem))
              scaleX(var(--nameplate-image-scale-x, 1))
              scaleY(var(--nameplate-image-scale-y, 1));
          }
        `
      : ""}

  > * {
    position: relative;
    z-index: 2;
  }
`;
