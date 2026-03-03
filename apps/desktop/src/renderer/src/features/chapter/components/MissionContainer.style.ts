import styled from "styled-components";
import Completed from "../assets/completed.svg";
import NotCompleted from "../assets/not-completed.svg";
import { font } from "@/shared/config/font";

export const MissionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
  position: absolute;
  top: 1.8rem;
  right: 2.4rem;
  background-color: ${({ theme }) => theme.background.normal};
  box-shadow: 0 0 7px 0 ${({ theme }) => theme.line.normal};
  padding: 0.5rem 1.25rem 2rem;
  border-radius: 1rem;
`;

export const MissionBoxTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.line.neutral};
`;

export const MissionTitle = styled.span`
  ${font.headline1.medium}
  color: ${({ theme }) => theme.label.neutral};
`;

export const MissionProgress = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${font.headline1.medium}
  color: ${({ theme }) => theme.label.neutral};
`;

export const MissionCurrentProgress = styled.span`
  ${font.headline1.medium}
  color: ${({ theme }) => theme.primary.normal};
`;

export const MissionTotalMissions = styled.span`
  ${font.headline1.medium}
  color: ${({ theme }) => theme.label.neutral};
`;

export const MissionList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.25rem;
`;

export const MissionBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

export const CompletedLogo = styled(Completed)`
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
`;

export const NotCompletedLogo = styled(NotCompleted)`
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
`;

export const MissionLabel = styled.span`
  ${font.headline1.medium}
  color: ${({ theme }) => theme.label.neutral};
  width: 14rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
