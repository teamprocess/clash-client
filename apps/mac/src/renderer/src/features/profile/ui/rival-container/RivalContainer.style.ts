import styled, { css } from "styled-components";

const flexCol = css`
  display: flex;
  flex-direction: column;
`;

export const Container = styled.div`
  display: flex;
  width: 60%;
  flex-direction: column;
  gap: 0.75rem;
  height: 100%;
  margin-top: 7.25rem;
`;

export const AddRivalButton = styled.button`
  width: 100%;
  border-radius: 0.75rem;
  background-color: ${({ theme }) => theme.background.alternative};
  padding: 1rem 0.75rem;
  ${flexCol};
  justify-content: flex-start;
  gap: 1rem;
  border: 0;
  cursor: pointer;
  flex: 1;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.primary.normal};
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
