import styled from "styled-components";
import { font } from "@clash/design-tokens/font";
import { palette } from "@clash/design-tokens/theme";

import CommitImg from "../../../assets/commit.svg?url";
import IssueImg from "../../../assets/issue.svg?url";
import PullRequestsImg from "../../../assets/pull-requests.svg?url";
import DateImg from "../../../assets/date.svg?url";
import FireImg from "../../../assets/fire.svg?url";
import CodeImg from "../../../assets/code.svg?url";
import ReviewImg from "../../../assets/review.svg?url";

export const DateIcon = styled.img.attrs({
  src: DateImg,
  alt: "날짜",
})`
  width: 1.05rem;
  height: 1.05rem;
`;

export const CommitIcon = styled.img.attrs({
  src: CommitImg,
  alt: "커밋",
})`
  width: 1.55rem;
  height: 1.55rem;
  opacity: 0.9;
  flex: 0 0 auto;
`;

export const IssueIcon = styled.img.attrs({
  src: IssueImg,
  alt: "이슈",
})`
  width: 1.55rem;
  height: 1.55rem;
  opacity: 0.9;
  flex: 0 0 auto;
`;

export const PullRequestsIcon = styled.img.attrs({
  src: PullRequestsImg,
  alt: "풀리퀘",
})`
  width: 1.55rem;
  height: 1.55rem;
  opacity: 0.9;
  flex: 0 0 auto;
`;

export const ReviewIcon = styled.img.attrs({
  src: ReviewImg,
  alt: "리뷰",
})`
  width: 1.55rem;
  height: 1.55rem;
  opacity: 0.9;
  flex: 0 0 auto;
`;

export const FireIcon = styled.img.attrs({
  src: FireImg,
  alt: "최다 커밋 레포지토리",
})`
  width: 1.05rem;
  height: 1.05rem;
  opacity: 0.9;
  flex: 0 0 auto;
`;

export const CodeIcon = styled.img.attrs({
  src: CodeImg,
  alt: "하루 동안 변경 라인",
})`
  width: 1.05rem;
  height: 1.05rem;
  opacity: 0.9;
  flex: 0 0 auto;
`;

export const ActiveContainer = styled.section`
  width: 100%;
  height: auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 52rem) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

export const Date = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
`;

export const DateText = styled.p`
  color: ${({ theme }) => theme.label.assistive};
  ${font.label.medium}
`;

export const Total = styled.span`
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
  margin-left: auto;

  @media (max-width: 52rem) {
    margin-left: 0;
  }
`;

export const Number = styled.p`
  ${font.title2.bold}
  color: ${({ theme }) => theme.label.assistive};
`;

export const TotalText = styled.p`
  color: ${({ theme }) => theme.label.assistive};
  ${font.caption.medium}
`;

export const GithubBox = styled.div`
  width: 100%;
  min-height: 6.625rem;
  border-radius: 1.25rem;
  padding: 1rem 1.25rem;
  background: ${({ theme }) => theme.label.disable};
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
  min-width: 0;
  box-sizing: border-box;

  @media (max-width: 52rem) {
    padding: 1rem;
  }
`;

export const Github = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 1rem;
  row-gap: 0.75rem;
  flex: 1;
  min-width: 0;

  @media (max-width: 52rem) {
    grid-template-columns: 1fr;
  }
`;

export const Stat = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  min-width: 0;
`;

export const StatTextGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  width: fit-content;
  min-width: 0;
`;

export const StatCount = styled.p`
  ${font.headline2.bold}
  color: ${({ theme }) => theme.label.strong};
`;

export const StatLabel = styled.p`
  ${font.caption.medium}
  color: ${({ theme }) => theme.label.normal};
  white-space: nowrap;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  flex: 1;
  width: 100%;
  min-width: 0;
`;

export const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;

  @media (max-width: 52rem) {
    align-items: flex-start;
  }
`;

export const MetaText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  min-width: 0;

  @media (max-width: 52rem) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
`;

export const MetaLabel = styled.p`
  ${font.label.medium}
  color: ${({ theme }) => theme.label.alternative};
  white-space: nowrap;
  flex: 0 0 auto;
`;

export const MetaValue = styled.p`
  ${font.label.bold}
  color: ${({ theme }) => theme.label.alternative};
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const HDivider = styled.div`
  width: 100%;
  height: 0.1rem;
  background: ${({ theme }) => theme.line.neutral};
`;

export const Lines = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
  min-width: 0;
  width: auto;

  @media (max-width: 52rem) {
    flex-wrap: wrap;
  }
`;

export const Plus = styled.span`
  ${font.label.bold}
  color: ${palette.green[40]};
`;

export const Minus = styled.span`
  ${font.label.bold}
  color: ${palette.red[60]};
`;

export const Slash = styled.span`
  ${font.caption.medium}
  color: ${({ theme }) => theme.label.alternative};
`;

export const LinesUnit = styled.span`
  ${font.caption.medium}
  color: ${({ theme }) => theme.label.alternative};
`;

export const EmptyBox = styled.div`
  width: 100%;
  min-height: 6.625rem;
  border-radius: 1.25rem;
  padding: 1.25rem;
  background: ${({ theme }) => theme.label.disable};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.35rem;
`;

export const EmptyTitle = styled.p`
  ${font.body.medium}
  color: ${({ theme }) => theme.label.strong};
  margin: 0;
`;

export const EmptyDesc = styled.p`
  ${font.label.medium}
  color: ${({ theme }) => theme.label.assistive};
  margin: 0;
`;
