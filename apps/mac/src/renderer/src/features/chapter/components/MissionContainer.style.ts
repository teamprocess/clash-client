import styled from "styled-components";
import { font } from "@clash/design-tokens/font";
import { palette } from "@clash/design-tokens/theme";
import Close from "@/features/profile/assets/close.svg";
import Correct from "../assets/correct.svg";
import InCorrect from "../assets/in-correct.svg";
import Clear from "../assets/clear.svg";
import Fail from "../assets/fail.svg";
import { Button } from "@/shared/ui/button/Button";

export const PanelContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1.5rem;
  gap: 1rem;
  background-color: ${({ theme }) => theme.background.normal};
`;

export const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
`;

export const HeaderMain = styled.div`
  flex: 1;
  min-width: 0;
`;

export const HeaderTitle = styled.h2`
  ${font.title2.medium}
  color: ${({ theme }) => theme.label.strong};
  word-break: keep-all;
`;

export const HeaderMeta = styled.p`
  ${font.body.regular}
  color: ${({ theme }) => theme.label.assistive};
  margin-top: 0.35rem;
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const IconButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  color: ${({ theme }) => theme.label.assistive};
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    opacity 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.fill.normal};
    opacity: 0.9;
  }
`;

export const CloseIcon = styled(Close)`
  width: 1.4rem;
  height: 1.4rem;
`;

export const OverviewBody = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.875rem;
  min-height: 0;
`;

export const SectionCard = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  padding: 1.1rem 1rem;
  border-radius: 0.9rem;
  background-color: ${({ theme }) => theme.background.alternative};
  border: 1px solid ${({ theme }) => theme.line.alternative};
`;

export const SectionTitle = styled.h3`
  ${font.headline2.medium}
  color: ${({ theme }) => theme.label.strong};
`;

export const ProgressSummary = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.35rem;
`;

export const ProgressCurrent = styled.span`
  ${font.display2.medium}
  color: ${({ theme }) => theme.primary.normal};
`;

export const ProgressTotal = styled.span`
  ${font.headline1.medium}
  color: ${({ theme }) => theme.label.assistive};
`;

export const ProgressTrack = styled.div`
  position: relative;
  width: 100%;
  height: 0.65rem;
  border-radius: 999px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.fill.normal};
`;

export const ProgressFill = styled.div<{ $value: number }>`
  width: ${({ $value }) => `${$value}%`};
  height: 100%;
  background-color: ${({ theme }) => theme.primary.normal};
  border-radius: inherit;
  transition: width 0.22s ease;
`;

export const MetaRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
`;

export const MetaItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const MetaLabel = styled.span`
  ${font.caption.medium}
  color: ${({ theme }) => theme.label.assistive};
`;

export const MetaValue = styled.span`
  ${font.body.medium}
  color: ${({ theme }) => theme.label.neutral};
`;

export const DescriptionText = styled.p`
  ${font.body.regular}
  color: ${({ theme }) => theme.label.neutral};
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: keep-all;
`;

export const InlineMessage = styled.p<{ $tone?: "error" | "neutral" }>`
  ${font.caption.regular}
  color: ${({ theme, $tone = "neutral" }) =>
    $tone === "error" ? palette.red[60] : theme.label.assistive};
  line-height: 1.45;
`;

export const FooterActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const PrimaryActionButton = styled(Button)`
  ${font.headline2.medium}
  min-height: 3.1rem;
  border-radius: 0.85rem;
`;

export const SecondaryActionButton = styled(Button)`
  ${font.headline2.medium}
  min-height: 3.1rem;
  border-radius: 0.85rem;
  background-color: ${({ theme }) => theme.background.alternative};
  color: ${({ theme }) => theme.label.normal};
  border: 1px solid ${({ theme }) => theme.line.normal};
`;

export const QuizBody = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.875rem;
  min-height: 0;
`;

export const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  gap: 0.35rem;
  padding: 0;
  ${font.caption.medium}
  color: ${({ theme }) => theme.label.assistive};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.label.normal};
  }
`;

export const BackArrow = styled.span`
  ${font.headline2.medium}
  line-height: 1;
`;

export const QuizProgress = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
`;

export const QuizStep = styled.span`
  ${font.body.medium}
  color: ${({ theme }) => theme.label.normal};
`;

export const QuizCard = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.1rem 1rem;
  border-radius: 0.9rem;
  background-color: ${({ theme }) => theme.background.alternative};
  border: 1px solid ${({ theme }) => theme.line.alternative};
`;

export const QuestionText = styled.p`
  ${font.headline1.medium}
  color: ${({ theme }) => theme.label.strong};
  line-height: 1.55;
  word-break: keep-all;
`;

export const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const ResultCard = styled(QuizCard)`
  gap: 1rem;
`;

export const ResultHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const ResultTextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

export const ResultTitle = styled.span`
  ${font.headline1.medium}
  color: ${({ theme }) => theme.label.strong};
`;

export const ResultCaption = styled.span`
  ${font.caption.regular}
  color: ${({ theme }) => theme.label.assistive};
`;

export const ExplanationBox = styled.div`
  padding: 0.95rem 1rem;
  border-radius: 0.8rem;
  background-color: ${({ theme }) => theme.fill.normal};
`;

export const ExplanationText = styled.p`
  ${font.body.regular}
  color: ${({ theme }) => theme.label.normal};
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: keep-all;
`;

export const SummaryCard = styled(QuizCard)`
  align-items: center;
  text-align: center;
  gap: 1rem;
`;

export const SummaryTitle = styled.h3`
  ${font.headline1.medium}
  color: ${({ theme }) => theme.label.strong};
`;

export const SummaryDescription = styled.p`
  ${font.body.regular}
  color: ${({ theme }) => theme.label.assistive};
  line-height: 1.55;
  white-space: pre-wrap;
`;

export const SummaryScore = styled.div`
  display: inline-flex;
  align-items: baseline;
  gap: 0.3rem;
  ${font.title1.medium}
  color: ${({ theme }) => theme.primary.normal};
`;

export const SummaryScoreTotal = styled.span`
  ${font.body.medium}
  color: ${({ theme }) => theme.label.assistive};
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 0.75rem;

  & > * {
    flex: 1;
  }
`;

export const CorrectIcon = styled(Correct)`
  flex-shrink: 0;
`;

export const IncorrectIcon = styled(InCorrect)`
  flex-shrink: 0;
`;

export const ClearIcon = styled(Clear)`
  flex-shrink: 0;
`;

export const FailIcon = styled(Fail)`
  flex-shrink: 0;
`;
