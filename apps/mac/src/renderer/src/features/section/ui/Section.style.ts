import styled from "styled-components";
import { font } from "@clash/design-tokens/font";
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

export const ChangeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  pointer-events: auto;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
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
  overflow-y: auto;
  cursor: grab;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const SectionItemWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 3rem;
  min-height: 35rem;
  padding: 10rem 10rem 10rem 22rem;
  min-width: max-content;
  box-sizing: border-box;
`;
