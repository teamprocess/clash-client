import styled from "styled-components";
import { font } from "@/shared/config/font";
import Pause from "../../assets/pause.svg";
import Timer from "../../assets/timer.svg";

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
  gap: 1.5rem;
`;

export const Time = styled.span`
  color: ${({ theme }) => theme.label.alternative};
  ${font.display1.medium};
`;

export const PauseIcon = styled(Pause)``;

export const ChangeMode = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  width: 100%;
`;

export const ChangeModeText = styled.span`
  color: ${({ theme }) => theme.label.assistive};
  ${font.headline1.medium};
`;

export const PomodoroTimerBox = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
`;

export const PomodoroTimeBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const PomodoroTimer = styled(Timer)``;
