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

export const ActivitySkeleton = styled.div`
  display: flex;
  flex: 2;
  min-width: 0;
  min-height: 0;
  flex-direction: column;
  gap: 2.5rem;
  padding: 2rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.background.normal};
`;

export const ActivityHeaderSkeleton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 0 1.5rem;
`;

export const TimerSkeleton = styled.div`
  display: flex;
  flex: 1;
  min-width: 0;
  flex-direction: column;
  gap: 0.75rem;
`;

export const StudySummarySkeleton = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  align-items: center;
  gap: 0.875rem;
`;

export const ActivityBodySkeleton = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
  flex-direction: column;
  gap: 2.5rem;
`;

export const GroupInfoSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
`;

export const GroupStatsSkeleton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
`;

export const MemberGridSkeleton = styled.div`
  display: grid;
  flex: 1;
  min-height: 0;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  align-content: start;
  column-gap: 1rem;
  row-gap: 1.25rem;
  overflow: hidden;
`;

export const MemberSkeleton = styled.div`
  display: flex;
  min-width: 0;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

export const GroupSideSkeleton = styled.div`
  display: flex;
  flex: 1;
  min-width: 0;
  min-height: 0;
  flex-direction: column;
  padding: 1.5rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.background.normal};
`;

export const GroupSideHeaderSkeleton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

export const GroupListSkeleton = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
  flex-direction: column;
  margin-top: 1rem;
  padding-bottom: 4rem;
  overflow: hidden;
`;

export const GroupListItemSkeleton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  padding: 1.25rem 0.75rem;
  border-bottom: 2px solid ${({ theme }) => theme.fill.alternative};
`;

export const GroupListItemLeftSkeleton = styled.div`
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 0.75rem;
`;

export const GroupListItemRightSkeleton = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: 0.5rem;
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
