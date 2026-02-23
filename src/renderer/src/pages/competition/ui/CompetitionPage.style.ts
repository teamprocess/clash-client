import styled from "styled-components";
import { font } from "@/shared/config/font";
import Smile from "@/shared/ui/assets/sweating-smile-face.svg";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const CompetitionTopBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 0.25rem;
  gap: 0.25rem;
  background: ${({ theme }) => theme.background.normal};
  border-radius: 0.75rem;
`;

export const WitchCompete = styled.button<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  border-radius: 0.5rem;
  ${font.headline1.bold}
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.fill.alternative : "transparent"};
  color: ${({ $isActive, theme }) => ($isActive ? theme.label.normal : theme.label.assistive)};
  cursor: pointer;
`;

export const EmptyText = styled.p`
  ${font.headline2.medium}
  color: ${({ theme }) => theme.label.neutral};
`;

export const PreDialogContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const ContentDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SmileIcon = styled(Smile)`
  width: 4.5rem;
  height: 4.5rem;
`;

export const ContentText = styled.p`
  ${font.headline1.bold}
  color: ${({ theme }) => theme.label.normal};
`;

export const ContentSubText = styled.p`
  ${font.label.medium}
  color: ${({ theme }) => theme.label.alternative};
`;
