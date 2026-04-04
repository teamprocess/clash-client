import styled from "styled-components";
import { font } from "@clash/design-tokens";

export const Panel = styled.div`
  width: 100%;
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: hidden;
`;

export const StreakSection = styled.div`
  width: 100%;
  flex: 0 0 auto;
  min-width: 0;
`;

export const InfoSection = styled.div`
  width: 100%;
  flex: 1 1 auto;
  min-height: 11rem;
  min-width: 0;
  display: flex;
`;

export const EmptyStateBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 0;
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
