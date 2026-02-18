import styled from "styled-components";
import Github from "@/shared/ui/assets/github.svg";
import { palette } from "@/shared/config/theme";
import { font } from "@/shared/config/font";

export const ConnectingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

export const GithubIcon = styled(Github)`
  width: 5rem;
  height: 5rem;
  color: ${palette.neutral[99]};
`;

export const FontBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  gap: 0.25rem;
`;

export const HugeFont = styled.p`
  ${font.headline2.bold}
  color: ${({ theme }) => theme.label.normal};
`;

export const TinyFont = styled.p`
  ${font.label.medium}
  color: ${({ theme }) => theme.label.neutral}
`;
