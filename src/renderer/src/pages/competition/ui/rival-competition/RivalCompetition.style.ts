import styled from "styled-components";
import { font } from "@/shared/config/font";
import { palette } from "@/shared/config/theme";
import Profile from "@/features/home/assets/home/profile.svg";
import Arrow from "@/features/home/assets/home/arrow.svg";
import Date from "@/features/home/assets/home/date.svg";
import BackArrow from "@/features/home/assets/home/back.svg";

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

export const Point = styled.p`
  height: 100%;
  ${font.label.medium}
  color: ${({ theme }) => theme.label.alternative};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 100%;
  height: 100%;
`;

export const CompareContentBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 1rem;
`;

export const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 1rem;
`;

export const ListContent = styled.div`
  padding: 1.5rem;
  width: 100%;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.background.normal};
`;

export const Content = styled.div`
  padding: 1.5rem;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.background.normal};
`;

export const RivalList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
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

export const ProfileWrapper = styled.div`
  width: 100%;
  height: 100%;
  gap: 0.5rem;
`;

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding: 0.75rem;
  border-bottom: 1px solid ${({ theme }) => theme.line.alternative};
  &:hover {
  }
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

type StatusProps = {
  $status: "ONLINE" | "AWAY" | "OFFLINE";
};

export const Status = styled.div<StatusProps>`
  ${font.caption.bold};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.125rem 0.5rem;
  border-radius: 0.5rem;
  color: ${palette.neutral[5]};
  background-color: ${({ $status, theme }) => {
    switch ($status) {
      case "ONLINE":
        return palette.green[50];
      case "AWAY":
        return palette.yellow[50];
      case "OFFLINE":
        return theme.label.assistive;
      default:
        return theme.label.alternative;
    }
  }};
`;

export const UsingAppText = styled.p`
  ${font.caption.regular};
  color: ${({ theme }) => theme.label.alternative};
`;

export const PlayTime = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;
  ${font.headline1.bold}
  color: ${({ theme }) => theme.label.normal};
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

export const RivalCompareWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
`;

export const DropDownBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;
`;

export const GraphBox = styled.div`
  padding: 1rem 1rem;
  height: 18rem;
  width: 100%;
  display: flex;
  align-items: flex-end;
  background-color: ${({ theme }) => theme.background.alternative};
  border-radius: 0.5rem;
  position: relative;
`;

export const Svg = styled.svg`
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
`;

export const LineGroup = styled.g``;

export const LinePath = styled.path<{ $isMe?: boolean }>`
  fill: none;
  stroke-width: ${({ $isMe }) => ($isMe ? 0.5 : 0.5)};
  opacity: ${({ $isMe }) => ($isMe ? 1 : 1)};
  transition: 0.2s;
`;

export const Dot = styled.circle<{ $isMe?: boolean }>`
  r: ${({ $isMe }) => ($isMe ? 2.5 : 2.5)};
  cursor: pointer;
`;

export const ScrollArea = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
`;

export const GraphInner = styled.div`
  width: max-content;
  min-width: 100%;
  padding-bottom: 0.5rem;
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
  z-index: 1000;
`;

export const WarPeriodText = styled.p`
  ${font.body.medium}
  color: ${({ theme }) => theme.label.normal};
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
  ${font.label.bold}
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
`;
