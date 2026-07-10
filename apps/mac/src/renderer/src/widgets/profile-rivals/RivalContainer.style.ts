import styled, { css } from "styled-components";
import { font } from "@clash/design-tokens/font";

import Plus from "@/shared/ui/assets/plus.svg";

const flexCol = css`
  display: flex;
  flex-direction: column;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1 1 auto;
  width: 100%;
  min-width: 0;
  height: 100%;
  min-height: 0;
  overflow: hidden;
`;

export const RefreshNotice = styled.div`
  ${font.caption.medium};
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.line.alternative};
  border-radius: 0.75rem;
  color: ${({ theme }) => theme.label.alternative};
`;

export const Container = styled.div`
  display: grid;
  grid-template-rows: repeat(4, minmax(clamp(4.35rem, 8.2vh, 5.25rem), 1fr));
  flex: 1 1 auto;
  height: 100%;
  min-height: 0;
  gap: 0.75rem;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 0.25rem;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const State = styled.div`
  ${font.label.medium};
  display: flex;
  grid-row: 1 / -1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  min-height: 5rem;
  padding: 1rem;
  border: 1px dashed ${({ theme }) => theme.line.alternative};
  border-radius: 0.75rem;
  color: ${({ theme }) => theme.label.alternative};
  text-align: center;
`;

export const AddRivalButton = styled.button`
  width: 100%;
  height: 100%;
  border-radius: 0.75rem;
  background-color: ${({ theme }) => theme.background.alternative};
  padding: clamp(0.75rem, 1.4vh, 1rem) 0.75rem;
  ${flexCol};
  justify-content: flex-start;
  cursor: pointer;
  min-height: clamp(4.35rem, 8.2vh, 5.25rem);

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.interaction.selectionBorder};
    outline-offset: 2px;
  }
`;

export const AddRivalBox = styled.div`
  ${flexCol};
  align-items: center;
  justify-content: center;
  width: 100%;
  flex: 1;
`;

export const PlusIcon = styled(Plus)`
  flex-shrink: 0;
`;
