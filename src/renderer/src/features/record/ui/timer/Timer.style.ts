import styled from "styled-components";
import { font } from "@/shared/config/font";
import Pause from "../../assets/pause.svg";

export const TimerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2.5rem 1rem 2rem 1rem;
  width: 100%;
  height: 100%;
`;

export const TimerBox = styled.div`
  display: flex;
  flex-direction: column;
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
  gap: 1rem;
`;

export const Time = styled.span`
  color: ${({ theme }) => theme.label.alternative};
  ${font.display1.medium};
`;

export const PauseIcon = styled(Pause)`
  cursor: pointer;
  width: 2.25rem;
  height: 2.25rem;
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
