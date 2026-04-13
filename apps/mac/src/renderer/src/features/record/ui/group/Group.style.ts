import styled from "styled-components";
import { font } from "@clash/design-tokens/font";
import Fire from "../../assets/fire.svg";
import Cry from "../../assets/cry.svg";

export const GroupContainer = styled.div`
  display: flex;
  flex: 2;
  background-color: ${({ theme }) => theme.background.normal};
  border-radius: 1rem;
  height: 100%;
`;

export const GroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 2rem;
  gap: 0;
  position: relative;
  width: 100%;
  height: 100%;
`;

export const GroupContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  height: 100%;
  min-height: 0;
  width: 100%;
`;

export const GroupBodySection = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
  flex-direction: column;
  gap: 1.5rem;
`;

export const HeaderTimer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 0 1.5rem;
`;

export const HeaderTimerSection = styled.div`
  display: flex;
  flex: 1;
  min-width: 0;
  margin-bottom: 1.5rem;

  & > div {
    padding: 0;
    height: auto;
    align-items: flex-start;
    justify-content: flex-start;
  }

  & > div > div {
    align-items: flex-start;
  }
`;

export const MyStudySummary = styled.div<{ $isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.875rem;
  margin-top: 1rem;
  color: ${({ $isActive, theme }) => ($isActive ? theme.primary.normal : theme.line.normal)};
`;

export const MyStudyFireIcon = styled(Fire)`
  width: 4rem;
  height: 4rem;
`;

export const MyStudyTime = styled.span<{ $isActive: boolean; $loading?: boolean }>`
  ${font.headline1.medium}
  color: ${({ $isActive, theme }) => ($isActive ? theme.primary.normal : theme.label.assistive)};
  opacity: ${({ $loading }) => ($loading ? 0.48 : 1)};
`;

export const GroupInfoRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.875rem;
  width: 100%;
`;

export const MemberCapacityText = styled.p`
  display: flex;
  margin: 0;
  align-items: center;
  ${font.title2.medium}
  color: ${({ theme }) => theme.label.alternative};
`;

export const CurrentMemberCount = styled.span`
  color: ${({ theme }) => theme.primary.normal};
`;

export const GroupTitle = styled.span`
  ${font.headline1.medium}
  color: ${({ theme }) => theme.label.alternative};
`;

export const GroupStats = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
  gap: 2rem;
`;

export const ActiveStudyingText = styled.p`
  display: flex;
  margin: 0;
  align-items: center;
  ${font.headline1.medium}
`;

export const ActiveStudyingCount = styled.span`
  color: ${({ theme }) => theme.primary.normal};
`;

export const EmptyGroupState = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  gap: 0.875rem;
`;

export const EmptyGroupIcon = styled(Cry)``;

export const EmptyGroupTextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const EmptyGroupTitle = styled.p`
  margin: 0;
  ${font.headline1.bold}
  color: ${({ theme }) => theme.label.normal};
`;

export const EmptyGroupDescription = styled.p`
  margin: 0;
  ${font.label.medium}
  color: ${({ theme }) => theme.label.assistive};
`;

export const MemberActivitySection = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
  flex-direction: column;
  gap: 0;
  margin-top: 1rem;
`;

export const MemberGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  column-gap: 1rem;
  row-gap: 1.25rem;
  justify-items: center;
  align-content: start;
  padding: 0;
  overflow: auto;
  min-height: 0;
  flex: 1;
`;

export const MemberStudyTime = styled.span`
  ${font.label.medium}
`;

export const MemberName = styled.span`
  ${font.headline2.medium}
`;

export const MemberBox = styled.div<{ $isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.875rem;
  color: ${({ $isActive, theme }) => ($isActive ? theme.primary.normal : theme.line.normal)};

  ${MemberStudyTime} {
    color: ${({ $isActive, theme }) => ($isActive ? theme.primary.normal : theme.label.assistive)};
  }

  ${MemberName} {
    color: ${({ $isActive, theme }) => ($isActive ? theme.label.normal : theme.label.assistive)};
  }
`;

export const FireIcon = styled(Fire)``;

export const MemberInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.375rem;
`;
