import styled from "styled-components";
import { font } from "@/shared/config/font";

export const OfflineContainer = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
`;

export const OfflineBox = styled.section`
  width: min(28rem, 100%);
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.background.alternative};
  border: 1px solid ${({ theme }) => theme.line.normal};
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
`;

export const Title = styled.h1`
  ${font.title2.medium}
  color: ${({ theme }) => theme.label.normal};
`;

export const Description = styled.p`
  ${font.body.regular}
  color: ${({ theme }) => theme.label.alternative};
  line-height: 1.5;
`;
