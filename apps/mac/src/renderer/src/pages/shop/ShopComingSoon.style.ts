import styled from "styled-components";
import { font } from "@clash/design-tokens/font";

export const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100%;
  padding: 1.5rem;
`;

export const Panel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: min(100%, 34rem);
  padding: 2.75rem 2rem;
  border: 1px solid ${({ theme }) => theme.line.normal};
  border-radius: 1rem;
  background: ${({ theme }) => theme.background.normal};
  text-align: center;
`;

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem 0.75rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.fill.alternative};
  color: ${({ theme }) => theme.label.assistive};
  ${font.caption.medium}
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

export const Title = styled.h1`
  ${font.title1.medium}
  color: ${({ theme }) => theme.label.strong};
  line-height: 1.35;
`;

export const Description = styled.p`
  ${font.body.regular}
  color: ${({ theme }) => theme.label.assistive};
  line-height: 1.6;
  max-width: 26rem;
  word-break: keep-all;
`;
