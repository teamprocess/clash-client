import styled from "styled-components";
import { font } from "@/shared/config/font";
import CompleteIcon from "../assets/complete.svg";
import Lock from "../assets/lock.svg";

export const RoadmapContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const RoadmapScrollable = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
    background: transparent; /* 스크롤바 배경(길) */
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.line.normal}; /* 스크롤바 핸들 */
    border-radius: 10px;
  }
`;

export const SectionItemWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  height: 35rem;
  margin-left: 36rem;
`;

export const SectionItemBox = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  height: 100%;
`;

export const SectionItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

export const SectionIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8rem;
  height: 8rem;
  background: ${({ theme }) => theme.label.disable};
  border-radius: 50%;
  position: relative;
`;

export const SectionIcon = styled.img``;

export const SectionComplete = styled(CompleteIcon)`
  position: absolute;
  right: 0.5rem;
  bottom: 0.5rem;
`;

export const SectionLock = styled(Lock)`
  position: absolute;
  right: 0.5rem;
  bottom: 0.5rem;
`;

export const SectionTitle = styled.span`
  ${font.headline2.medium};
  font-size: 1rem;
  color: ${({ theme }) => theme.label.assistive};
`;
