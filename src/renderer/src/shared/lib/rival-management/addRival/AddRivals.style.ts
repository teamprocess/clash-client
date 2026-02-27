import styled, { css } from "styled-components";
import { font } from "@/shared/config/font";
import { palette } from "@/shared/config/theme";
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
  justify-content: space-between;
`;

export const TopSection = styled.div``;

export const SearchInputBox = styled.div`
  margin: 1rem 0;
`;

export const BottomRow = styled.div`
  ${flexRow};
  justify-content: space-between;
  align-items: center;
`;

export const ProfileContent = styled.div<{ $height?: string }>`
  ${flexRow};
  align-items: center;
  justify-content: flex-start;
  gap: 0.75rem;
  height: ${({ $height }) => $height ?? "auto"};
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

export const UserChoiceContainer = styled.div`
  ${flexCol};
  width: 100%;
  height: 12rem;
  overflow-y: auto;
  scrollbar-width: none;
`;

export const UserChoiceBox = styled.div<{ $isSelected: boolean }>`
  ${flexRow};
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.line.alternative};
  cursor: pointer;
  transition: 0.1s ease-in-out;

  &:hover {
    border-radius: 0.75rem;
    padding: 0.5rem 0.75rem;
    background-color: ${({ theme }) => theme.fill.alternative};
  }
`;

export const ButtonBox = styled.div`
  width: 100%;
  ${flexRow};
  align-items: center;
  justify-content: flex-end;
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
