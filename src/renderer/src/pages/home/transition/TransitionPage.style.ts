import styled from "styled-components";
import BackArrow from "../../../features/home/assets/home/back.svg";
import Arrow from "@/features/home/assets/home/arrow.svg";
import Date from "@/features/home/assets/home/date.svg";
import GitCommits from "@/features/home/assets/home/git-commit.svg";
import Fire from "@/features/home/assets/home/fire.svg";
import Code from "@/features/home/assets/home/code.svg";
import Time from "@/features/home/assets/home/time.svg";
import GitPR from "../../../features/home/assets/home/git-pr.svg";
import Status from "@/features/home/assets/home/status.svg";
import Review from "@/features/home/assets/home/review.svg";
import GitIssue from "@/features/home/assets/home/git-issue.svg";
import SolvedAc from "@/features/home/assets/home/solved-logo.svg";
import { font } from "@/shared/config/font";
import { palette } from "@/shared/config/theme";
import { Line } from "@/features/home/ui/active/Active.style";
import { ArrowDegProps, LineProps } from "@/pages/home/transition/TransitionPage";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.background.normal};
  border-radius: 1rem;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
  height: 100%;
`;

export const TopPositionBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const BackArrowIcon = styled(BackArrow)``;

export const TitleBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
  width: 100%;
  align-items: center;
`;

export const Title = styled.p`
  ${font.title1.bold}
  color: ${({ theme }) => theme.label.normal};
`;

export const SelectWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
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

export const ContentBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  //height: 100%;
  flex: 1;
  gap: 1.25rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  flex: 1;
  background-color: ${({ theme }) => theme.background.alternative};
  border-radius: 0.75rem;
  gap: 0.625rem;
`;

export const SubtitleBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.625rem 1.5rem;
  background-color: ${({ theme }) => theme.fill.neutral};
  border-top-right-radius: 0.75rem;
  border-top-left-radius: 0.75rem;
`;

export const Subtitle = styled.p`
  ${font.title2.bold};
  color: ${({ theme }) => theme.label.normal};
`;

export const DateBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25rem;
`;

export const DateIcon = styled(Date)``;

export const DateText = styled.p`
  ${font.body.medium}
  color: ${({ theme }) => theme.label.assistive};
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.75rem;
  gap: 0.625rem;
  height: 100%;
`;

export const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.75rem;
  gap: 0.625rem;
  border-bottom: 1px solid ${({ theme }) => theme.line.neutral};
`;

export const InfoTitle = styled.p`
  ${font.headline1.bold};
  color: ${({ theme }) => theme.label.normal};
  width: 100%;
`;

export const GithubInfoBox = styled(TitleBox)`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  //min-height: 8rem;
`;

export const SolvedInfoBox = styled(TitleBox)`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 8rem;
`;

export const InfoSubtitleBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
`;

export const CountText = styled.p`
  ${font.display1.bold};
`;

export const InfoSubtitle = styled.p`
  ${font.headline1.medium}
`;

export const CalculateBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const CalculateContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const CalculateInfoBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25rem;
  padding: 0.625rem;
`;

export const ExplainText = styled.p`
  ${font.label.regular}
  color: ${({ theme }) => theme.label.alternative};
`;

export const RepositorieName = styled.p`
  ${font.label.bold};
  color: ${({ theme }) => theme.label.alternative};
`;

export const CodeGap = styled.p`
  ${font.label.bold};
  color: ${({ theme }) => theme.label.alternative};
`;

export const PlusText = styled.span`
  color: ${palette.green[40]};
`;

export const MinusText = styled.span`
  color: ${palette.red[60]};
`;

export const TimeText = styled.span`
  ${font.label.bold};
`;

export const GridFooter = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

export const FooterItem = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  padding: 0.75rem;
  gap: 0.625rem;
`;

export const GroupTitle = styled.p`
  ${font.headline1.bold};
  color: ${({ theme }) => theme.label.normal};
  width: 100%;
`;

export const MainStat = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  height: 100%;

  .count {
    ${font.display1.bold};
    color: ${({ theme }) => theme.label.normal};
  }

  .unit {
    ${font.headline1.medium};
    color: ${({ theme }) => theme.label.normal};
  }
`;

export const WidthLine = styled(Line)`
  margin: 0;
`;

export const HeightLine = styled.div`
  width: 1px;
  height: 100%;
  background-color: ${({ theme }) => theme.line.neutral};
`;

export const GrowthBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

export const RateBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const GrowthWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const GrowthValue = styled.span<{ $status: "up" | "down" | "same" }>`
  ${font.label.bold};
  display: flex;
  flex-direction: row;
  padding: 0.15rem 0.75rem;
  gap: 0.25rem;
  align-items: center;
  color: ${palette.neutral[99]};
  background-color: ${({ $status }) => {
    if ($status === "up") return palette.green[40];
    if ($status === "down") return palette.red[50];
    return ({ theme }) => theme.label.assistive; // 동일 시 회색
  }};
  border-radius: 999px;
`;

export const ArrowIcon = styled(Arrow)`
  position: absolute;
  top: 32%;
  right: 1rem;
  width: 0.75rem;
  height: 0.75rem;
`;
export const GitCommitIcon = styled(GitCommits)``;
export const FireIcon = styled(Fire)``;
export const CodeIcon = styled(Code)``;
export const TimeIcon = styled(Time)``;
export const GitPRIcon = styled(GitPR)``;
export const StatusIcon = styled(Status)``;
export const ReviewIcon = styled(Review)<LineProps>`
  width: ${({ $width }) => ($width ? `${$width}rem` : "1rem")};
  height: ${({ $width }) => ($width ? `${$width}rem` : "1rem")};
`;
export const GitIssueIcon = styled(GitIssue)``;
export const GrowthRateArrowIcon = styled(Arrow)<ArrowDegProps>`
  width: 1rem;
  height: 1rem;
  transform: rotate(${({ $deg }) => $deg || 0}deg);
  path {
    fill: ${palette.neutral[99]};
  }
`;
export const SolvedAcIcon = styled(SolvedAc)``;
