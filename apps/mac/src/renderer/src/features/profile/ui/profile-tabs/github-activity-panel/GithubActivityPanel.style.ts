import styled from "styled-components";
import { font } from "@clash/design-tokens";

export const EmptyStateBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 44.5%;
  border: 1px dashed ${({ theme }) => theme.fill.alternative};
  border-radius: 0.75rem;
  background-color: ${({ theme }) => theme.fill.neutral};
  text-align: center;
  gap: 0.25rem;
`;

export const EmptyTitle = styled.p`
  ${font.headline2.medium};
  color: ${({ theme }) => theme.label.normal};
`;

export const EmptyDescription = styled.p`
  ${font.caption.medium};
  color: ${({ theme }) => theme.label.alternative};
`;
