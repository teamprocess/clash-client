import styled from "styled-components";
import { font } from "@clash/design-tokens/font";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const RefreshNotice = styled.div`
  ${font.caption.medium};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.line.alternative};
  border-radius: 0.75rem;
  color: ${({ theme }) => theme.label.alternative};
`;

export const EmptyState = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const EmptyText = styled.p`
  ${font.headline2.medium}
  color: ${({ theme }) => theme.label.neutral};
`;
