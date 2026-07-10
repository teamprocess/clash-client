import styled from "styled-components";
import GitHub from "@/shared/ui/assets/github.svg";
import { font } from "@clash/design-tokens/font";

export const ConnectingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export const GitHubIcon = styled(GitHub)`
  width: 5rem;
  height: 5rem;
  color: ${({ theme }) => theme.label.normal};
`;

export const FontBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  gap: 0.5rem;
`;

export const HugeFont = styled.p`
  ${font.headline2.bold}
  color: ${({ theme }) => theme.label.normal};
`;

export const TinyFont = styled.p`
  ${font.label.medium}
  color: ${({ theme }) => theme.label.neutral}
`;
