import styled from "styled-components";
import { font } from "@/shared/config/font";

const MAX_BAR_HEIGHT = 8;

export const TransitionContainer = styled.div`
  padding: 1.5rem;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.background.normal};

  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  ${font.title2.bold}
`;

export const SubTitle = styled.div`
  ${font.headline2.bold}
  padding: 0 0.75rem;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  flex: 1;
`;

export const ContentBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20%;
`;

export const InfoBox = styled.div`
  padding: 0.75rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  gap: 0.75rem;
`;

export const DateBox = styled.div`
  display: flex;
  flex-direction: row;
`;

export const DateTitle = styled.div`
  ${font.label.medium}
  width: 100%;
  display: flex;
  justify-content: center;
  color: ${({ theme }) => theme.label.alternative};
`;

export const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.line.normal};
`;

// 활동시간, commit 수 간의 세로선
export const VerticalLine = styled.div`
  height: 116%;
  width: 2px;
  background-color: ${({ theme }) => theme.line.neutral};
`;

export const GraphBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  width: 100%;
  height: 100%;
`;

export const Bars = styled.div`
  position: relative;
  width: 100%;
  height: ${MAX_BAR_HEIGHT}rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;

type BarProps = {
  value: number;
  max: number;
};

export const Value = styled.p<BarProps>`
  ${font.body.medium}

  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  bottom: ${({ value, max }) =>
    max <= 0 ? "0rem" : `calc(${(value / max) * MAX_BAR_HEIGHT}rem + 0.4rem)`};

  transition: bottom 0.4s ease;
  white-space: nowrap;
`;

export const Bar = styled.div<BarProps>`
  width: 2.5rem;
  height: 100%;
  border-radius: 0.25rem;
  background-color: ${({ theme }) => theme.primary.normal};

  transform-origin: bottom;
  transform: ${({ value, max }) => {
    if (max <= 0) return "scaleY(0)";
    const ratio = Math.min(Math.max(value / max, 0), 1);
    return `scaleY(${ratio})`;
  }};

  transition: transform 0.4s ease;
`;
