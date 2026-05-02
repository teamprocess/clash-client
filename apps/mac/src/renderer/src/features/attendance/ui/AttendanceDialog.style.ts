import styled, { css, keyframes } from "styled-components";
import { font } from "@clash/design-tokens/font";
import { palette } from "@clash/design-tokens/theme";
import AttendedSvg from "./assets/attended.svg";
import NotAttendedSvg from "./assets/not-attended.svg";
import CalendarSvg from "@/shared/ui/assets/calendar.svg";

const stampIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.7) rotate(-12deg);
  }

  58% {
    opacity: 1;
    transform: scale(1.08) rotate(4deg);
  }

  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
`;

const stampFlash = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.7);
  }

  45% {
    opacity: 0.18;
  }

  100% {
    opacity: 0;
    transform: scale(1.2);
  }
`;

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
  position: relative;
  z-index: 1;
`;

export const AttendedIcon = styled(AttendedSvg)`
  ${dayStatusIconStyle}
`;

export const NotAttendedIcon = styled(NotAttendedSvg)`
  ${dayStatusIconStyle}
`;

export const DayIconFrame = styled.div<{ $isAnimated: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.85rem;
  height: 3.85rem;

  ${({ $isAnimated, theme }) =>
    $isAnimated &&
    css`
      animation: ${stampIn} 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;

      &::after {
        content: "";
        position: absolute;
        inset: 0.35rem;
        z-index: 0;
        border-radius: 999px;
        background-color: ${theme.primary.normal};
        animation: ${stampFlash} 0.5s ease-out both;
      }
    `}

  @media (prefers-reduced-motion: reduce) {
    animation: none;

    &::after {
      animation: none;
      opacity: 0;
    }
  }
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
