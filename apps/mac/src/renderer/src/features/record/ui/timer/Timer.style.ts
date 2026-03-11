import styled from "styled-components";
import { font } from "@clash/design-tokens/font";
import Pause from "../../assets/pause.svg";
import Arrow from "../../assets/arrow.svg";

export const TimerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  width: 100%;
  height: 100%;
`;

export const TimerBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const ArrowButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;

  &:disabled {
    cursor: default;
  }
`;

export const ArrowIcon = styled(Arrow)<{ rotate: "LEFT" | "RIGHT"; $disabled?: boolean }>`
  rotate: ${({ rotate }) => (rotate === "LEFT" ? "180deg" : "0deg")};
  opacity: ${({ $disabled }) => ($disabled ? 0.32 : 1)};
`;

export const DateBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Date = styled.span`
  color: ${({ theme }) => theme.label.assistive};
  ${font.title2.medium};
`;

export const TimeBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
`;

export const Time = styled.span`
  display: inline-block;
  min-width: 8ch;
  text-align: center;
  color: ${({ theme }) => theme.label.alternative};
  ${font.display1.medium};
  font-variant-numeric: tabular-nums;
  font-feature-settings: "tnum";
`;

export const PauseIcon = styled(Pause)`
  cursor: pointer;
  width: 2rem;
  height: 2rem;
`;

export const PlayButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;
