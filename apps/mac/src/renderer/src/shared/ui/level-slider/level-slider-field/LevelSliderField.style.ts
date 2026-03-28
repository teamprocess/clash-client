import styled from "styled-components";

export const LevelSliderFieldWrapper = styled.div<{
  $isActive: boolean;
}>`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  cursor: pointer;
  position: relative;
  z-index: 1;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    scale: 1.15;
    opacity: 0.2;
    z-index: -1;
    background: ${({$isActive, theme}) => $isActive ? theme.primary.normal : 'none'};
    border-radius: 15px;
  }
`;
