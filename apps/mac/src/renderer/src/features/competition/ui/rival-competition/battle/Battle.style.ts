import styled, { css } from "styled-components";
import { font } from "@clash/design-tokens/font";
import { palette } from "@clash/design-tokens/theme";
import Date from "@/features/home/assets/home/date.svg";
import BackArrow from "@/features/home/assets/home/back.svg";
import Fire from "@/features/home/assets/home/fire.svg";
import Checked from "@/features/home/assets/home/check-box.svg";
import { ProfileAvatar } from "@/shared/ui/profile-avatar";

const flexRow = css`
  display: flex;
  flex-direction: row;
`;

const flexCol = css`
  display: flex;
  flex-direction: column;
`;

export const HorizontalLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.line.neutral};
`;

export const VerticalLine = styled.div`
  width: 1px;
  height: 70%;
  background-color: ${({ theme }) => theme.line.neutral};
`;

export const ContentBox = styled.div`
  ${flexCol};
  width: 100%;
  height: 100%;
  gap: 1rem;
`;

export const Content = styled.div`
  padding: 1.5rem;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.background.normal};
`;

export const TitleBox = styled.div`
  ${flexRow};
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const Title = styled.p`
  ${font.title2.bold}
  color: ${({ theme }) => theme.label.normal};
`;

export const ProfileContent = styled.div<{ $height?: string }>`
  ${flexRow};
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: ${({ $height }) => $height ?? "auto"};
`;

export const ProfileIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
`;

export const BattleDetailProfileBox = styled.div`
  width: 4rem;
  height: 4rem;
`;

export const BattleDetailAvatar = styled(ProfileAvatar)`
  width: 100%;
  height: 100%;
`;

export const NameBox = styled.div`
  ${flexRow};
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
`;

export const ProfileName = styled.span`
  ${font.headline2.medium}
  color: ${({ theme }) => theme.label.normal};
`;

export const DropDownBox = styled.div`
  ${flexRow};
  align-items: center;
  gap: 0.75rem;
`;

export const BattleWrapper = styled.div`
  ${flexCol};
  gap: 0.75rem;
  width: 100%;
  height: 100%;
`;

export const BattleTextBox = styled.div`
  ${flexRow};
  gap: 0.5rem;
  align-items: center;
`;

export const BattleListContainer = styled.div`
  ${flexCol};
  min-height: 11rem;
  max-height: 14.65rem;
  overflow-y: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const UpperHandJudge = styled.div<{ $type: string }>`
  padding: 0.25rem 0.625rem;

  ${({ $type, theme }) => {
    if ($type === "우세" || $type === "승리") {
      return css`
        background-color: ${palette.blue[50]};
        color: ${theme.fill.normal};
      `;
    }

    if ($type === "열세" || $type === "패배") {
      return css`
        background-color: ${palette.red[50]};
        color: ${theme.label.normal};
      `;
    }

    return css`
      background-color: ${palette.neutral[60]};
      color: ${theme.fill.normal};
    `;
  }}

  ${font.caption.bold}
  border-radius: 0.5rem;
`;

export const BattleProfileBox = styled.button<{ $disabled?: boolean }>`
  ${flexRow};
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.line.alternative};
  cursor: ${({ $disabled }) => ($disabled ? "default" : "pointer")};
  background-color: transparent;
  transition: 0.1s ease-in-out;
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};

  ${({ $disabled, theme }) =>
    !$disabled &&
    css`
      &:hover {
        padding: 0.8rem 1rem;
        border-radius: 0.5rem;
        background-color: ${theme.background.alternative};
      }
    `}
`;

export const BattleName = styled.p`
  ${font.headline1.medium};
  color: ${({ theme }) => theme.label.normal};
`;

export const DateBox = styled.div`
  ${flexRow};
  align-items: center;
  gap: 0.25rem;
`;

export const DateIcon = styled(Date)``;

export const DateText = styled.span`
  ${font.label.medium};
  color: ${({ theme }) => theme.label.assistive};
`;

export const DetailBox = styled.div`
  ${flexRow};
  gap: 0.25rem;
  align-items: center;
`;

export const DetailButton = styled.div<{ $disabled?: boolean }>`
  ${font.label.medium};
  color: ${({ theme, $disabled }) => ($disabled ? theme.label.assistive : theme.label.alternative)};
`;

export const BackArrowIcon = styled(BackArrow)`
  width: 0.625rem;
  transform: rotate(180deg);
  color: ${({ theme }) => theme.label.alternative};
`;

export const SubText = styled.p`
  ${font.caption.regular}
  color: ${({ theme }) => theme.label.assistive};
`;

export const DetailWrapper = styled.div`
  ${flexCol};
  padding: 1.5rem;
  gap: 1rem;
  border-radius: 0.5rem;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.background.alternative};
`;

export const UpperHandContainer = styled.div`
  ${flexRow};
  align-items: center;
  justify-content: space-between;
`;

export const UpperHandProfile = styled.div`
  ${flexCol};
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
`;

export const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

export const ProfileChoiceAvatar = styled(ProfileAvatar)`
  width: 100%;
  height: 100%;
`;

export const UpperHandName = styled.p`
  ${font.headline2.bold}
  color: ${({ theme }) => theme.label.normal};
`;

export const TransitionBox = styled.div`
  ${flexCol};
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  padding: 0.5rem;
`;

export const UpperHandTransition = styled.div`
  ${flexRow};
  width: 90%;
  background-color: ${({ theme }) => theme.fill.normal};
  border-radius: 0.75rem;
  overflow: hidden;
`;

export const UpperHandBar = styled.div<{
  $width: number;
  $isRival: boolean;
}>`
  ${flexRow};
  justify-content: ${({ $isRival }) => ($isRival ? "flex-start" : "flex-end")};
  padding: 0;
  width: ${({ $width }) => `${$width}%`};
  height: 100%;
  transition: width 0.4s ease;
  position: relative;
  ${({ $isRival, theme }) =>
    $isRival
      ? `
        background-color: ${theme.primary.normal};
        border-radius: 0.75rem 0 0 0.75rem;
      `
      : `
        background-color: ${palette.blue[50]};
        border-radius: 0 0.75rem 0.75rem 0;
      `}
`;

export const PercentText = styled.p<{ $isRival: boolean }>`
  ${font.title2.bold}
  ${palette.neutral[99]}
  position: absolute;
  z-index: 2;
  opacity: 0.6;
  padding-left: ${({ $isRival }) => ($isRival ? "0.5rem" : "0")};
  padding-right: ${({ $isRival }) => ($isRival ? "0" : "0.5rem")};
`;

export const DetailAnalyzeContainer = styled.div`
  ${flexCol};
  padding: 1rem;
  width: 100%;
  height: 100%;
  border-radius: 0.75rem;
  background-color: ${({ theme }) => theme.fill.normal};
`;

export const AnalyzeText = styled.p`
  ${font.headline1.bold};
  color: ${({ theme }) => theme.label.normal};
`;

export const AnalyzeBox = styled.div`
  ${flexRow};
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;
  width: 100%;
  height: 100%;
`;

export const AnalyzeRow = styled.div`
  ${flexRow};
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  height: 100%;
`;

export const AnalyzeContent = styled.div<{ $width?: string }>`
  ${flexCol};
  justify-content: space-around;
  width: ${({ $width }) => $width ?? "2.5rem"};
  height: 70%;
`;

export const AnalyzeName = styled.p`
  width: 100%;
  ${font.body.bold}
  color: ${({ theme }) => theme.label.normal};
`;

export const AnalyzeBar = styled.div<{ $width: number; $isRival: boolean }>`
  ${flexRow};
  padding: 0.5rem 0;
  width: ${({ $width }) => `${$width}%`};
  ${({ $isRival, theme }) =>
    $isRival
      ? `
        background-color: ${theme.primary.normal};
      `
      : `
        background-color: ${palette.blue[50]};
      `};

  border-radius: 0.625rem;
  transition: width 0.4s ease;
`;

export const DefaultBattleBox = styled.div`
  ${flexCol};
  height: 100%;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

export const AnalyzeLabel = styled.div`
  color: ${palette.neutral[99]};
  width: 100%;
  min-height: 1rem;
  ${flexRow};
  align-items: center;
  justify-content: end;
  padding: 0 0.5rem;
`;

export const FireIcon = styled(Fire)`
  width: 3.25rem;
  height: 3.25rem;
  color: ${({ theme }) => theme.line.normal};
`;

export const DefaultBattleText = styled.p`
  ${font.label.medium};
  color: ${({ theme }) => theme.label.assistive};
`;

export const BattleApplyListContainer = styled.div<{ $hasApply: boolean }>`
  ${flexCol};
  width: 100%;
  flex: 1;
  min-height: 0;
  align-items: ${({ $hasApply }) => ($hasApply ? "stretch" : "center")};
  justify-content: ${({ $hasApply }) => ($hasApply ? "flex-start" : "center")};
  overflow-y: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const UserChoiceContainer = styled.div`
  ${flexCol};
  width: 100%;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
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
        padding: 0.5rem 1rem;
        background-color: ${theme.fill.alternative};
      }
    `}

  ${({ $isRival }) =>
    $isRival &&
    css`
      cursor: default;
    `}
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

export const ProfileTagBox = styled.div`
  ${flexRow};
  align-items: center;
  gap: 0.5rem;
`;

export const BottomBox = styled.div`
  margin-top: 1.5rem;
`;

export const ButtonBox = styled.div`
  width: 100%;
  ${flexRow};
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
`;

export const WarPeriodText = styled.p`
  ${font.body.medium}
  color: ${({ theme }) => theme.label.normal};
`;

export const CompareDiff = styled.span`
  ${font.caption.bold}
  color: ${palette.neutral[99]};
  white-space: nowrap;
`;

export const ModalContainer = styled.div`
  ${flexCol};
  height: 100%;
  padding: 0.625rem;
  min-height: 0;
  gap: 1.1rem;
  align-items: stretch;
  justify-content: flex-start;
`;

export const ModalHeader = styled.div`
  ${flexCol};
  width: 100%;
`;

export const ModalBody = styled.div`
  ${flexCol};
  flex: 1;
  min-height: 0;
  width: 100%;
  justify-content: space-between;
`;

export const DateChoiceRow = styled.div`
  ${flexRow};
  width: 100%;
  justify-content: space-between;
`;

export const DateChoiceBox = styled.button<{ $active: boolean }>`
  padding: 0.5rem 1rem;
  width: 30%;
  border-radius: 0.5rem;
  border: 2px solid ${({ theme }) => theme.line.alternative};
  background-color: ${({ $active, theme }) => ($active ? theme.primary.normal : theme.fill.normal)};
  color: ${({ theme }) => theme.label.normal};
  ${font.headline2.medium}
  cursor: pointer;
  ${flexRow};
  align-items: center;
  justify-content: center;
  transition: 50ms ease-in-out;

  &:hover {
    background-color: ${({ theme, $active }) =>
      $active ? theme.primary.normal : theme.fill.neutral};
  }
`;

export const DataBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.25rem;
  ${font.label.bold}
`;

export const ProfileSubText = styled.div`
  color: #8a8f98;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.2;
`;

export const EmptyStateBox = styled.div`
  ${flexCol};
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
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

export const ErrorText = styled.p`
  padding-top: 1.425rem;
  ${font.label.medium};
  color: ${palette.red[60]};
  width: 100%;
`;
