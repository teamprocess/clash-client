import styled from "styled-components";
import ProfileIcon from "../../assets/rival-profile.png";
import VscodeIcon from "../../assets/Vscode.svg?url";

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

export const appIconMap = {
  vscode: VscodeIcon,
} as const;
