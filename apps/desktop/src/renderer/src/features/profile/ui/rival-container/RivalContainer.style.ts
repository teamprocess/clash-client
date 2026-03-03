import styled, { css } from "styled-components";
import ProfileIcon from "../../assets/rival-profile.png";
import Vscode from "../../assets/vscode.svg";

const flexCol = css`
  display: flex;
  flex-direction: column;
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-top: 7.25rem;
`;

export const profileSrcMap = {
  default: ProfileIcon,
} as const;

export const VscodeIcon = styled(Vscode)`
  width: 0.875rem;
  height: 0.875rem;
`;

export const AddRivalButton = styled.button`
  width: 100%;
  height: 100%;
  border-radius: 0.75rem;
  background-color: ${({ theme }) => theme.background.alternative};
  padding: 1rem 0.75rem;
  ${flexCol};
  justify-content: flex-start;
  gap: 1rem;
  border: 0;
  cursor: pointer;

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
