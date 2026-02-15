import styled from "styled-components";
import Clash from "../assets/clash-logo.svg";
import { font } from "@/shared/config/font";
import { palette } from "@/shared/config/theme";

export const SignInCompleteContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.background.alternative};
`;

export const SignInCompleteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  height: 80%;
  width: 34rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.background.normal};
`;

export const ClashLogo = styled(Clash)`
  width: 14rem;
  height: 3rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

export const Title = styled.span`
  ${font.title1.bold};
  color: ${({ theme }) => theme.label.neutral};
`;

export const Description = styled.p`
  ${font.body.medium};
  color: ${({ theme }) => theme.label.alternative};
`;

export const OpenAppButton = styled.button`
  width: 16rem;
  padding: 1rem 0;
  border-radius: 1rem;
  border: none;
  color: ${palette.neutral[97]};
  background-color: ${({ theme }) => theme.primary.normal};
  ${font.headline2.medium};
  cursor: pointer;
`;

export const SubMessage = styled.p`
  ${font.caption.medium};
  color: ${({ theme }) => theme.label.assistive};
`;
