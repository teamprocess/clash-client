import styled, { css } from "styled-components";
import { font } from "@clash/design-tokens/font";
import { palette } from "@clash/design-tokens/theme";
import AttendedSvg from "./assets/attended.svg";
import NotAttendedSvg from "./assets/not-attended.svg";
import CalendarSvg from "@/shared/ui/assets/calendar.svg";

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  gap: 2rem;
  margin-top: 0.25rem;
`;

export const Hero = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.5rem;
`;

export const GiftIcon = styled(CalendarSvg)`
  width: 4.25rem;
  height: 4.25rem;
`;

export const Headline = styled.h2`
  ${font.title2.bold}
  margin: 0;
  color: ${({ theme }) => theme.label.normal};
`;

export const Description = styled.p`
  ${font.label.medium}
  margin: 0;
  color: ${({ theme }) => theme.label.assistive};
`;

export const Board = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const DayGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  gap: 1rem 0.5rem;
`;

export const DayItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0 0 calc((100% - 2.25rem) / 4);
  max-width: calc((100% - 2.25rem) / 4);
  gap: 0.5rem;
`;

const dayStatusIconStyle = css`
  width: 3.85rem;
  height: 3.85rem;
`;

export const AttendedIcon = styled(AttendedSvg)`
  ${dayStatusIconStyle}
`;

export const NotAttendedIcon = styled(NotAttendedSvg)`
  ${dayStatusIconStyle}
`;

export const DayLabel = styled.span<{ $isAttended: boolean }>`
  ${font.label.medium}
  text-align: center;
  color: ${({ $isAttended, theme }) => ($isAttended ? theme.label.assistive : theme.label.disable)};
`;

export const ErrorText = styled.p`
  ${font.label.medium}
  margin: 0.75rem 0 0;
  color: ${palette.red[60]};
  text-align: center;
`;
