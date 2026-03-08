import styled, { css } from "styled-components";
import { font } from "@clash/design-tokens/font";
import { palette } from "@clash/design-tokens/theme";
import Profile from "@/features/home/assets/home/profile.svg";
import Checked from "@/features/home/assets/home/check-box.svg";

const flexRow = css`
  display: flex;
  flex-direction: row;
`;

const flexCol = css`
  display: flex;
  flex-direction: column;
`;

export const DialogLayout = styled.div`
  ${flexCol};
  height: 100%;
  justify-content: flex-start;
  padding: 0.5rem;
`;

export const TopSection = styled.div`
  ${flexCol};
  flex: 1;
  min-height: 0;
`;

export const SearchInputBox = styled.div`
  margin-top: 1rem;
`;

export const BottomRow = styled.div`
  ${flexRow};
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

export const ProfileContent = styled.div<{ $height?: string }>`
  ${flexRow};
  align-items: center;
  width: 100%;
  justify-content: space-between;
  gap: 0.75rem;
  height: ${({ $height }) => $height ?? "auto"};
`;

export const ProfileBox = styled.div`
  ${flexRow};
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
`;

export const ProfileTagBox = styled.div`
  ${flexRow};
  align-items: center;
  gap: 0.125rem;
`;

export const ProfileIcon = styled(Profile)`
  width: 2.25rem;
  height: 2.25rem;
`;

export const ProfileName = styled.p`
  ${font.headline2.medium}
  color: ${({ theme }) => theme.label.normal};
`;

export const ProfileMention = styled.p`
  ${font.label.regular}
  color: ${({ theme }) => theme.label.alternative};
`;

export const UserChoiceContainer = styled.div<{ $uiStatus?: "create" }>`
  ${flexCol};
  width: 100%;
  height: ${({ $uiStatus }) => ($uiStatus === "create" ? "26rem" : "100%")};

  ${({ $uiStatus }) =>
    $uiStatus === "create"
      ? `
        overflow-y: auto;
        scrollbar-width: none;
      `
      : `
      height: 100%;
      `}
`;

export const UserChoiceBox = styled.div<{ $isSelected?: boolean; $isRival?: boolean }>`
  ${flexRow};
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid ${({ theme }) => theme.line.alternative};
  cursor: pointer;
  transition: 0.1s ease-in-out;

  ${({ $isRival, theme }) =>
    !$isRival &&
    css`
      &:hover {
        border-radius: 0.75rem;
        padding: 0.5rem 1.25rem;
        background-color: ${theme.fill.alternative};
      }
    `}

  ${({ $isRival }) =>
    $isRival &&
    css`
      cursor: default;
    `}
`;

export const ButtonBox = styled.div`
  width: 100%;
  ${flexRow};
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  top: -1rem;
  gap: 0.75rem;
`;

export const CloseButton = styled.button`
  width: 4.25rem;
  border-radius: 0.625rem;
  color: ${palette.neutral[97]};
  padding: 0.4rem 0.5rem;
  background: ${({ theme }) => theme.line.normal};
  cursor: pointer;
`;

export const OkayButton = styled.button`
  width: 4.25rem;
  border-radius: 0.625rem;
  color: ${palette.neutral[97]};
  padding: 0.4rem 0.5rem;
  background: ${({ theme }) => theme.primary.normal};
  cursor: pointer;
`;

export const CheckedIcon = styled(Checked)``;

export const UncheckedBox = styled.div`
  appearance: none;
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid ${({ theme }) => theme.line.normal};
  border-radius: 0.25rem;
  cursor: pointer;
  background-color: ${({ theme }) => theme.fill.normal};
`;

export const ErrorText = styled.span`
  ${font.caption.medium};
  color: ${palette.red[60]};
  width: 100%;
`;

export const TabHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, max-content);
  align-items: center;
  gap: 1rem;
`;

export const Tab = styled.button<{ $isActive: boolean }>`
  ${font.title2.medium}
  color: ${({ $isActive, theme }) => ($isActive ? theme.label.normal : theme.label.assistive)};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

export const TabRail = styled.div`
  position: relative;
  height: 0.25rem;
  width: 100%;
  background-color: ${({ theme }) => theme.line.neutral};
  border-radius: 1rem;
  overflow: hidden;
`;

export const TabActiveRail = styled.div<{ $left: number; $width: number }>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${({ $left }) => `${$left}px`};
  width: ${({ $width }) => `${$width}px`};
  background-color: ${({ theme }) => theme.primary.normal};
  transition:
    left 0.2s ease,
    width 0.2s ease;
`;

export const ApplyContainer = styled.div`
  ${flexCol};
  width: 100%;
  flex: 1;
  min-height: 0;
  padding: 1rem;
  gap: 2rem;

  overflow-y: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const DetermineTitle = styled.p`
  ${font.title2.medium};
  color: ${palette.neutral[97]};
`;

export const DetermineContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DetermineList = styled.div`
  ${flexCol};
`;

export const EmptyStateBox = styled.div`
  ${flexCol};
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 10rem;
  padding: 2rem 1rem;
  border: 1px dashed ${({ theme }) => theme.line.alternative};
  border-radius: 0.75rem;
  background-color: ${({ theme }) => theme.fill.normal};
  text-align: center;
  gap: 0.5rem;
`;

export const EmptyTitle = styled.p`
  ${font.headline2.medium};
  color: ${({ theme }) => theme.label.normal};
`;

export const EmptyDescription = styled.p`
  ${font.caption.medium};
  color: ${({ theme }) => theme.label.alternative};
`;
