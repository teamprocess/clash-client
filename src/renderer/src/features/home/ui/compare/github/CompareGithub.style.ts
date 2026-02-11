import styled from "styled-components";
import Date from "@/features/home/assets/home/date.svg";
import GitCommits from "@/features/home/assets/home/git-commit.svg";
import Fire from "@/features/home/assets/home/fire.svg";
import Code from "@/features/home/assets/home/code.svg";
import Time from "@/features/home/assets/home/time.svg";
import GitPR from "@/features/home/assets/home/git-pr.svg";
import Status from "@/features/home/assets/home/status.svg";
import Review from "@/features/home/assets/home/review.svg";
import GitIssue from "@/features/home/assets/home/git-issue.svg";
import { font } from "@/shared/config/font";
import { palette } from "@/shared/config/theme";
import { Line } from "@/features/home/ui/active/Active.style";

export const TitleBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
  width: 100%;
  align-items: center;
`;

export const ContentBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
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

export const CodeGap = styled.div`
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

export const GitCommitIcon = styled(GitCommits)``;
export const FireIcon = styled(Fire)`
  color: ${({ theme }) => theme.label.alternative};
  width: 1.25rem;
  height: 1.25rem;
`;
export const CodeIcon = styled(Code)``;
export const TimeIcon = styled(Time)`
  width: 1.25rem;
  height: 1.25rem;
`;
export const GitPRIcon = styled(GitPR)``;
export const StatusIcon = styled(Status)``;
export const ReviewIcon = styled(Review)<{ $width: number }>`
  width: ${({ $width }) => ($width ? `${$width}rem` : "1rem")};
  height: ${({ $width }) => ($width ? `${$width}rem` : "1rem")};
`;
export const GitIssueIcon = styled(GitIssue)``;
