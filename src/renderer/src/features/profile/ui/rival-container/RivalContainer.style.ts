import styled from "styled-components";
import ProfileIcon from "../../assets/rival-profile.png";
import Vscode from "../../assets/vscode.svg";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-top: auto;
`;

export const profileSrcMap = {
  default: ProfileIcon,
} as const;

export const VscodeIcon = styled(Vscode)`
  width: 0.875rem;
  height: 0.875rem;
`;
