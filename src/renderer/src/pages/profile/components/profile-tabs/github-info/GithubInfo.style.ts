import styled from "styled-components";
import { font } from "@/shared/config/font";
import { palette } from "@/shared/config/theme";

export const ActiveContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Date = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Icon = styled.img`
  width: 1.25rem;
  height: 1.25rem;
`;

export const DateText = styled.p`
  color: ${({ theme }) => theme.label.assistive};
  ${font.body.medium}
`;

export const Total = styled.span`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
`;

export const Number = styled.p`
  ${font.headline1.bold}
  color: ${({ theme }) => theme.label.assistive};
`;

export const TotalText = styled.p`
  color: ${({ theme }) => theme.label.assistive};
  ${font.label.medium}
`;

export const GithubBox = styled.div`
  width: 100%;
  height: 6.625rem;
  border-radius: 1.25rem;
  padding: 1.25rem;
  background: ${({ theme }) => theme.label.disable};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 3rem;
  box-sizing: border-box;
  overflow: hidden;
  min-width: 0;
`;

export const Github = styled.div`
  display: grid;
  grid-template-columns: repeat(2, max-content);
  column-gap: 1.25rem;
  row-gap: 0.625rem;
  flex: 0 1 auto;
  min-width: 0;
`;

export const Stat = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: fit-content;
  min-width: 0;
`;

export const StatIcon = styled.img`
  width: 1.875rem;
  height: 1.875rem;
  opacity: 0.9;
  flex: 0 0 auto;
`;

export const StatTextGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  width: fit-content;
  min-width: 0;
`;

export const StatCount = styled.p`
  ${font.title1.bold}
  color: ${({ theme }) => theme.label.strong};
`;

export const StatLabel = styled.p`
  ${font.label.medium}
  color: ${({ theme }) => theme.label.normal};
  white-space: nowrap;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  flex: 0 1 15.5rem;
  width: 15.5rem;

  min-width: 0;
`;

export const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
`;

export const MetaIcon = styled.img`
  width: 1.25rem;
  height: 1.25rem;
  opacity: 0.9;
  flex: 0 0 auto;
`;

export const MetaText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
`;

export const MetaLabel = styled.p`
  ${font.body.medium}
  color: ${({ theme }) => theme.label.alternative};
  white-space: nowrap;
`;

export const MetaValue = styled.p`
  ${font.body.bold}
  color: ${({ theme }) => theme.label.alternative};
  white-space: nowrap;
`;

export const HDivider = styled.div`
  width: 17.5rem;
  height: 1px;
  background: ${({ theme }) => theme.line.neutral};
`;

export const Lines = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
  width: 1.25rem;
`;

export const Plus = styled.span`
  ${font.body.bold}
  color: ${palette.green[40]};
`;

export const Minus = styled.span`
  ${font.body.bold}
  color: ${palette.red[60]};
`;

export const Slash = styled.span`
  ${font.label.medium}
  color: ${({ theme }) => theme.label.alternative};
`;

export const LinesUnit = styled.span`
  ${font.label.medium}
  color: ${({ theme }) => theme.label.alternative};
`;
