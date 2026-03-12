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
  margin: 1rem 0;
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
  height: ${({ $uiStatus }) => ($uiStatus === "create" ? "25rem" : "100%")};

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
  top: -1.75rem;
  gap: 0.75rem;
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
  ${font.label.medium};
  color: ${palette.red[60]};
  width: 100%;
  white-space: pre-line;
`;

export const ApplyContainer = styled.div`
  ${flexCol};
  width: 100%;
  flex: 1;
  min-height: 0;
  padding: 1rem;
  gap: 1rem;

  overflow-y: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const DetermineTitle = styled.p`
  ${font.title2.medium};
  color: ${palette.neutral[97]};
  width: 100%;
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
  margin-top: 1rem;
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
