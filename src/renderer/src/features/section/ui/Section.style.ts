import styled from "styled-components";

export const RoadmapContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
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
