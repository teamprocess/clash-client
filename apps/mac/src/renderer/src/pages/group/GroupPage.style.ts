import styled from "styled-components";
import { font } from "@clash/design-tokens/font";

export const GroupPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  height: 100%;
  min-height: 0;
`;

export const Content = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  height: 100%;
  min-height: 0;
`;

export const PageState = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  min-height: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 2rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.background.normal};
  text-align: center;
`;

export const PageStateTitle = styled.h1`
  ${font.title2.medium};
  color: ${({ theme }) => theme.label.normal};
`;

export const PageStateDescription = styled.p`
  ${font.body.regular};
  color: ${({ theme }) => theme.label.alternative};
`;
