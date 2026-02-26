import styled, { css } from "styled-components";
import { font } from "@/shared/config/font";
import { palette } from "@/shared/config/theme";
import Profile from "@/features/home/assets/home/profile.svg";
import Arrow from "@/shared/ui/assets/arrow.svg";
import Date from "@/features/home/assets/home/date.svg";
import BackArrow from "@/features/home/assets/home/back.svg";
import Fire from "@/features/home/assets/home/fire.svg";
import Checked from "@/features/home/assets/home/check-box.svg";

const flexRow = css`
  display: flex;
  flex-direction: row;
`;

const flexCol = css`
  display: flex;
  flex-direction: column;
`;

export const GaroLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.line.neutral};
`;

export const SeroLine = styled.div`
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

export const ProfileIcon = styled(Profile)`
  width: 2rem;
  height: 2rem;
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

export const SelectWrapper = styled.div`
  ${flexRow};
  position: relative;
`;

export const ArrowIcon = styled(Arrow)`
  position: absolute;
  top: 32%;
  right: 1rem;
  width: 0.75rem;
  height: 0.75rem;
`;

//드랍다운
export const Select = styled.select`
  ${font.body.regular};
  width: 7.5rem;
  height: 2rem;
  padding: 0 0.75rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.fill.neutral};
  color: ${({ theme }) => theme.label.normal};
  border: none;
  appearance: none;
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 0.75rem;
  &:focus {
    outline: none;
  }
`;

// 작동안되는 option 메소드 (브라우저에서 방해)
export const Option = styled.option`
  ${font.body.regular};
  background-color: ${({ theme }) => theme.line.neutral};
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

export const MakeBattle = styled.button`
  ${font.body.medium}
  color: ${({ theme }) => theme.label.normal};
  background-color: ${({ theme }) => theme.primary.normal};
  padding: 0.25rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
`;

export const BattleListContainer = styled.div`
  ${flexCol};
`;

export const UpperHandJudge = styled.div<{ $type: string }>`
  padding: 0.25rem 0.625rem;
  ${({ $type }) =>
    $type === "우세"
      ? `background-color: ${palette.blue[50]}`
      : $type === "열세"
        ? `background-color: ${palette.red[50]};`
        : `background-color: ${palette.neutral[60]}`};
  ${font.caption.bold}
  color: ${({ theme }) => theme.fill.normal};
  border-radius: 0.5rem;
`;

export const BattleProfileBox = styled.button`
  ${flexRow};
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.line.alternative};
  cursor: pointer;
  background-color: transparent;
  &:hover {
    background-color: ${({ theme }) => theme.background.alternative};
  }
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

export const DetailButton = styled.div`
  ${font.label.medium};
  color: ${({ theme }) => theme.label.alternative};
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

export const UpperHandProfileIcon = styled(Profile)`
  width: 4rem;
  height: 4rem;
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
  opacity: 0.6;
  z-index: 1000;
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

export const UserChoiceContainer = styled.div`
  ${flexCol};
  width: 100%;
  height: 20rem;
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
  background-color: transparent;
  &:hover {
    background-color: ${({ theme }) => theme.fill.alternative};
  }
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
  margin-top: 0.9rem;
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

export const WarPeriodText = styled.p`
  ${font.body.medium}
  color: ${({ theme }) => theme.label.normal};
`;

export const CompareDiff = styled.span`
  ${font.caption.bold}
  color: ${palette.neutral[99]};
  white-space: nowrap;
`;

export const ModalContent = styled.div`
  ${flexCol};
  height: 100%;
  padding-top: 1.5rem;
  align-items: flex-end;
  justify-content: space-between;
`;

export const DateChoiceRow = styled.div`
  ${flexRow};
  width: 100%;
  justify-content: space-between;
`;

export const DateChoiceBox = styled.div<{ $active: boolean }>`
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
  &:hover {
    background-color: ${palette.red[40]};
  }
`;

export const DataBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.25rem;
  ${font.label.bold}
`;
