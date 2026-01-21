import styled from "styled-components";
import { font } from "@/shared/config/font";
import { palette } from "@/shared/config/theme";
import Profile from "@/features/home/assets/home/profile.svg";
import Arrow from "@/features/home/assets/home/arrow.svg";
import Date from "@/features/home/assets/home/date.svg";
import BackArrow from "@/features/home/assets/home/back.svg";
import Fire from "@/features/home/assets/home/fire.svg";
import Search from "@/features/home/assets/home/search.svg";
import Checked from "@/features/home/assets/home/check-box.svg";

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
  display: flex;
  flex-direction: column;
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
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const Title = styled.p`
  ${font.title2.bold}
  color: ${({ theme }) => theme.label.normal};
`;

export const ProfileContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

export const ProfileIcon = styled(Profile)`
  width: 2rem;
  height: 2rem;
`;

export const NameBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.125rem;
`;

export const ProfileName = styled.span`
  ${font.headline2.medium}
  color: ${({ theme }) => theme.label.normal};
`;

export const ProfileMention = styled.span`
  ${font.label.regular}
  color: ${({ theme }) => theme.label.alternative};
`;

export const SelectWrapper = styled.div`
  display: flex;
  flex-direction: row;
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
  background-image: url(${ArrowIcon});
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
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;
`;

export const BattleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  height: 100%;
`;

export const BattleTextBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
`;

export const MakeBattle = styled.div`
  ${font.body.medium}
  color: ${({ theme }) => theme.label.normal};
  background-color: ${({ theme }) => theme.primary.normal};
  padding: 0.25rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
`;

export const BattleListContainer = styled.div`
  display: flex;
  flex-direction: column;
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

export const BattleProfileBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
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
`;

export const DateBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.25rem;
`;

export const DateIcon = styled(Date)``;

export const DateText = styled.span`
  ${font.label.medium};
  color: ${({ theme }) => theme.label.assistive};
`;

export const DetailBox = styled.div`
  display: flex;
  flex-direction: row;
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
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  gap: 1rem;
  border-radius: 0.5rem;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.background.alternative};
`;

export const UpperHandContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const UpperHandProfile = styled.div`
  display: flex;
  flex-direction: column;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  padding: 0.5rem;
`;

export const UpperHandTransition = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  background-color: ${({ theme }) => theme.fill.normal};
  border-radius: 0.75rem;
  overflow: hidden;
`;

export const UpperHandBar = styled.div<{
  $width: number;
  $isRival: boolean;
}>`
  display: flex;
  padding: 0 0.5rem;
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

export const PercentText = styled.p`
  ${font.title2.bold}
  ${palette.neutral[99]}
  position: absolute;
  opacity: 0.6;
  z-index: 1000;
`;

export const DetailAnalyzeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.75rem 1rem;
  width: 100%;
  height: 100%;
  border-radius: 0.75rem;
  background-color: ${({ theme }) => theme.fill.normal};
`;

export const AnalyzeText = styled.p`
  ${font.body.bold}
  color: ${({ theme }) => theme.label.normal};
`;

export const AnalyzeBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;
  width: 100%;
  height: 100%;
`;

export const AnalyzeContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2.5rem;
  height: 70%;
`;

export const AnalyzeName = styled.p`
  ${font.caption.bold}
  color: ${({ theme }) => theme.label.normal};
`;

export const AnalyzeBar = styled.div<{ $width: number; $isRival: boolean }>`
  display: flex;
  padding: 0.5rem;
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
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

export const AnalyzeLabel = styled.p`
  ${font.label.bold}
  color: ${palette.neutral[99]};
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

export const SearchBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  margin-top: 1rem;
  gap: 0.75rem;
`;

export const SearchUsers = styled.input`
  width: 100%;
  height: 3.5rem;
  padding: 0.5rem 3.5rem 0.5rem 1rem;
  border-radius: 0.75rem;
  border: none;
  background-color: ${({ theme }) => theme.fill.alternative};
  ${font.body.medium}
  color: ${({ theme }) => theme.label.neutral};
  &::placeholder {
    color: ${({ theme }) => theme.label.assistive};
  }
  &:focus {
    outline: none;
  }
`;

export const SearchIconBox = styled.div`
  color: ${({ theme }) => theme.label.neutral};
`;

export const SearchIcon = styled(Search)`
  position: absolute;
  right: 1rem;
  top: 43%;
  transform: translateY(-50%);
  width: 1.85rem;
  height: 1.85rem;
  pointer-events: none;
`;

export const UserChoiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 12rem;
  overflow-y: auto;
  scrollbar-width: none;
`;

export const UserChoiceBox = styled.div<{ $isSelected: boolean }>`
  display: flex;
  flex-direction: row;
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
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.125rem;
`;

export const BottomBox = styled.div`
  margin-top: 0.9rem;
`;

export const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
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
