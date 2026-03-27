import styled from "styled-components";
import { font } from "@clash/design-tokens/font";
import Clash from "../../shared/assets/clash-icon.svg";

export const RedirectContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

export const RedirectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: 2.5rem;
  gap: 1rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Description = styled.p`
  ${font.body.medium};
  color: ${({ theme }) => theme.label.alternative};
`;

export const SubMessage = styled.p`
  ${font.caption.medium};
  color: ${({ theme }) => theme.label.assistive};
`;

export const SubLinkMessage = styled.span`
  text-decoration: underline;
  cursor: pointer;
`;

export const ClashIcon = styled(Clash)`
  height: 1.5rem;
`;
