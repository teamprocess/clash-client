import styled from "styled-components";

export const LevelSliderThumbWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: end;
`;

export const LevelSliderThumbLine = styled.div<{
  $step: number;
  $isActive?: boolean;
}>`
  // step이 증가할 수록 흰 색에서 primary color로 가까워 지도록 color-mix
  background-color: color-mix(
    in hsl shorter hue,
    #ddd ${({ $step }) => `${100 - 12.5 * $step}%`},
    ${({ theme }) => theme.primary.normal} ${({ $step }) => `${12.5 * $step}%`}
  );
  width: 100%;
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0.3)};
  height: ${({ $step }) => `${12.5 * $step}%`};
  transition: opacity 0.5s ease-in-out;
  border-radius: 8px 8px 0 0;
`;
