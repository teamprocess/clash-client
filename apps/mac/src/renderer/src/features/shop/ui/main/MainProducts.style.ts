import { font } from "@clash/design-tokens/font";
import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  min-height: 100%;
  width: 100%;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.background.normal};
  overflow: visible;
`;

export const BannerImage = styled.div`
  width: 100%;
  aspect-ratio: 2384 / 480;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.fill.neutral};
  background-image: url('https://cdn.clash.kr/shop/season/banner.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  box-sizing: border-box;
  overflow: auto;
`;

export const StateBox = styled.div`
  width: 100%;
  min-height: 100%;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 2rem 1.5rem;
  text-align: center;
`;

export const StateTitle = styled.h2`
  ${font.title2.medium};
  color: ${({ theme }) => theme.label.normal};
  margin: 0;
`;

export const StateDescription = styled.p`
  ${font.body.medium};
  color: ${({ theme }) => theme.label.assistive};
  margin: 0;
  white-space: pre-wrap;
`;

export const ErrorNotice = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border: 1px solid ${({ theme }) => theme.line.alternative};
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.fill.neutral};
`;

export const ErrorNoticeText = styled.p`
  ${font.body.medium};
  color: ${({ theme }) => theme.label.normal};
  margin: 0;
`;

export const RetryButton = styled.button`
  min-width: 8rem;
  height: 2.75rem;
  padding: 0 1rem;
  border: none;
  border-radius: 0.625rem;
  background-color: ${({ theme }) => theme.primary.normal};
  color: ${({ theme }) => theme.label.normal};
  ${font.headline2.bold};
  cursor: pointer;
  flex: 0 0 auto;
`;
