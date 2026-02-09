import styled from "styled-components";
import { font } from "@/shared/config/font";
import { palette } from "@/shared/config/theme";

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const MonthArrowBtn = styled.button`
  width: 1.1rem;
  height: 1.1rem;
  border: none;
  background: transparent;
  display: grid;
  place-items: center;
  cursor: pointer;

  img {
    width: 1.1rem;
    height: 1.1rem;
  }
`;

export const Title = styled.div`
  ${font.title2.medium};
  color: ${({ theme }) => theme.label.normal};
`;

export const Weekdays = styled.div`
  margin-top: 0.5rem;
  display: grid;
  grid-template-columns: repeat(7, 3.125rem);
  gap: 2.25rem;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
`;

export const Weekday = styled.div<{ $sun?: boolean; $sat?: boolean }>`
  ${font.title2.medium};

  color: ${({ $sun, $sat, theme }) =>
    $sun ? palette.red[50] : $sat ? palette.blue[50] : theme.label.neutral};
`;

export const CalendarBox = styled.div`
  width: 100%;
  height: 16rem;
  border-radius: 1.25rem;
  background: ${({ theme }) => theme.background.normal};
  padding: 0.25rem 1.25rem;
  box-sizing: border-box;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 3.125rem);
  gap: 0.625rem 2.25rem;
  width: fit-content;
  margin: 0.625rem auto;
`;

export const DayCell = styled.div<{ $level?: 0 | 1 | 2 | 3; $dim?: boolean }>`
  width: 3.125rem;
  height: 2.375rem;
  border-radius: 0.625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.background.normal};

  ${({ $dim }) =>
    $dim
      ? `
    background: transparent;
  `
      : ""}

  ${({ $dim, $level }) => {
    if ($dim) return "";
    if ($level === 1) return `background: #3DCD5F20;`;
    if ($level === 2) return `background: #3DCD5F80;`;
    if ($level === 3) return `background: #3DCD5F;`;
    return `background: rgba(35, 70, 45, 0.55);`;
  }}
`;

export const DayNum = styled.span<{ $dim?: boolean }>`
  ${font.headline1.medium};
  color: ${({ $dim, theme }) => ($dim ? theme.label.alternative : theme.label.normal)};
`;

export const Legend = styled.div`
  margin-top: 0.25rem;
  display: flex;
  justify-content: flex-end;
`;

export const LegendPill = styled.div<{ $tone: "low" | "mid" | "high" }>`
  width: 1.5rem;
  height: 0.875rem;
  padding: 0 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  ${font.caption.medium};
  color: ${({ theme }) => theme.label.strong};

  ${({ $tone }) =>
    $tone === "low"
      ? `background: #3DCD5F20;`
      : $tone === "mid"
        ? `background: #3DCD5F80;`
        : `background: #3DCD5F;`}
`;
