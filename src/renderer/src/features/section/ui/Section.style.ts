import styled from "styled-components";
import { font } from "@/shared/config/font";
import Change from "../assets/change.svg";

export const RoadmapContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const RoadmapTitleBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  position: absolute;
  top: 1.8rem;
  left: 2.5rem;
  z-index: 120;
  pointer-events: none;
`;

export const RoadmapTitle = styled.span`
  ${font.title2.medium}
  color: ${({ theme }) => theme.label.neutral};
`;

export const RoadmapTitleArrowIcon = styled(Change)`
  color: ${({ theme }) => theme.label.neutral};
  width: 1.75rem;
  height: 1.75rem;
`;

export const RoadmapScrollable = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.background.normal};
  border-radius: 1rem;
  overflow-x: auto;
  overflow-y: hidden;
  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.line.normal}; /* 스크롤바 핸들 */
    border-radius: 10px;
  }
`;

export const SectionItemWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 3rem;
  height: 35rem;
  padding-left: 24rem;
  min-width: max-content;
`;
