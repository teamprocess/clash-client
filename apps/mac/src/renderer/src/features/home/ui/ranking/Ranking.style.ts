import styled from "styled-components";
import { font } from "@clash/design-tokens/font";

export const RankingContainer = styled.div`
  position: relative;
  padding: clamp(0.875rem, 2vw, 1.5rem);
  width: 100%;
  height: 100%;
  min-height: 0;
  border-radius: clamp(0.75rem, 1.5vw, 1rem);
  background-color: ${({ theme }) => theme.background.normal};
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

export const TitleBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    align-items: stretch;
  }
`;

export const Title = styled.div`
  ${font.title2.bold};
  min-width: 0;
  word-break: keep-all;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const DropDown = styled.div`
  width: min(15rem, 100%);
  min-width: 0;
  height: auto;
  gap: 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.line.neutral};
  margin: clamp(0.5rem, 1.5vw, 0.75rem) 0;
  flex-shrink: 0;
`;

export const UserWrapper = styled.div`
  width: 100%;
  flex: 1;
  min-height: 0;
  position: relative;
`;

export const UserContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const StickyUser = styled.div<{ $position: "top" | "bottom" }>`
  position: absolute;
  left: clamp(0.5rem, 2vw, 1rem);
  right: clamp(0.5rem, 2vw, 1rem);
  ${({ $position }) =>
    $position === "top"
      ? `top: clamp(3.25rem, 7vw, 3.75rem);`
      : `bottom: clamp(0.5rem, 2vw, 1rem);`}
  z-index: 50;
  background: ${({ theme }) => theme.fill.neutral};
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: auto;
  margin: 0;

  @media (max-width: 768px) {
    left: 0.5rem;
    right: 0.5rem;
  }
`;

export const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(1rem, 2vw, 1.5rem);
  gap: 1rem;
  border-radius: 0.5rem;
  width: 100%;
  height: 100%;
  min-height: 12rem;
  background-color: ${({ theme }) => theme.background.alternative};
  box-sizing: border-box;
`;

export const DefaultBattleBox = styled.div`
  display: flex;
  height: 100%;
  min-height: 8rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-align: center;
`;

export const DefaultBattleText = styled.p`
  ${font.label.medium};
  color: ${({ theme }) => theme.label.assistive};
  word-break: keep-all;
  padding: 0 0.5rem;
`;
