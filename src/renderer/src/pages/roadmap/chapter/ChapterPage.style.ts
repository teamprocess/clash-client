import styled from "styled-components";

export const ChapterContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const ChapterScrollable = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(64px, 1fr));
  grid-template-rows: repeat(auto-fill, 64px);
  gap: 0.05rem;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.line.alternative};
  border-radius: 1rem;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent; /* 스크롤바 배경(길) */
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.line.normal};
    border-radius: 10px;
  }
`;

export const Square = styled.div`
  width: 100%;
  height: 100%;
  aspect-ratio: 1 / 1;
  background-color: ${({ theme }) => theme.background.normal};
`;

export const RoadmapWrapper = styled.div`
  width: 48rem;
  height: 72rem;
  position: absolute;
  top: 10rem;
  right: 6rem;
`;
