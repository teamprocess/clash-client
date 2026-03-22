import styled, { css, keyframes } from "styled-components";
import { font } from "@clash/design-tokens/font";
import { palette } from "@clash/design-tokens/theme";
import Close from "@/features/profile/assets/close.svg";
import Correct from "../assets/correct.svg?url";
import InCorrect from "../assets/in-correct.svg?url";
import Clear from "../assets/clear.svg";
import Fail from "../assets/fail.svg";
import { Button } from "@/shared/ui/button/Button";

const panelBackground = "#27282b";
const neutralSurface = "rgba(255, 255, 255, 0.035)";
const neutralSurfaceStrong = "rgba(255, 255, 255, 0.055)";
const subtleBorder = "rgba(255, 255, 255, 0.08)";

const skeletonWave = keyframes`
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
`;

const skeletonBase = css`
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.05) 0%,
    rgba(255, 255, 255, 0.11) 50%,
    rgba(255, 255, 255, 0.05) 100%
  );
  background-size: 200% 100%;
  animation: ${skeletonWave} 1.6s ease-in-out infinite;
`;

export const PanelContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 2rem 2.5rem 2rem;
  gap: 1.25rem;
  background-color: ${panelBackground};
`;

export const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
`;

export const HeaderMain = styled.div`
  flex: 1;
  min-width: 0;
`;

export const HeaderTitle = styled.h2`
  ${font.title1.medium}
  color: ${({ theme }) => theme.label.strong};
  word-break: keep-all;
  line-height: 1.25;
`;

export const HeaderMeta = styled.p`
  ${font.body.regular}
  color: ${({ theme }) => theme.label.normal};
  margin-top: 1rem;
  padding: 1rem 1.2rem;
  border-radius: 0.95rem;
  background-color: ${neutralSurfaceStrong};
  box-shadow: none;
  line-height: 1.65;
  word-break: keep-all;
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
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 999px;
  color: ${({ theme }) => theme.label.assistive};
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    opacity 0.2s ease;

  &:hover {
    background-color: ${neutralSurface};
    opacity: 0.9;
  }
`;

export const CloseIcon = styled(Close)`
  width: 2.5rem;
  height: 2.5rem;
`;

export const OverviewBody = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 1.35rem;
  min-height: 0;
`;

export const SectionCard = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  padding: 0;
  background-color: transparent;
  border: none;

  & + & {
    padding-top: 1.3rem;
    border-top: 1px solid ${subtleBorder};
  }
`;

export const SectionTitle = styled.h3`
  ${font.body.medium}
  color: ${({ theme }) => theme.label.strong};
  letter-spacing: -0.01em;
`;

export const ProgressSummary = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.45rem;
`;

export const ProgressCurrent = styled.span`
  ${font.headline1.medium}
  color: ${({ theme }) => theme.primary.normal};
`;

export const ProgressTotal = styled.span`
  ${font.body.regular}
  color: ${({ theme }) => theme.label.assistive};
`;

export const ProgressTrack = styled.div`
  position: relative;
  width: 100%;
  height: 0.5rem;
  border-radius: 999px;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.1);
`;

export const ProgressFill = styled.div<{ $value: number }>`
  width: ${({ $value }) => `${$value}%`};
  height: 100%;
  background-color: ${({ theme }) => theme.primary.normal};
  border-radius: inherit;
  transition: width 0.22s ease;
`;

export const DescriptionText = styled.p`
  ${font.body.regular}
  color: ${({ theme }) => theme.label.normal};
  line-height: 1.65;
  white-space: pre-wrap;
  word-break: keep-all;
  max-width: 34rem;
`;

export const InlineMessage = styled.p<{ $tone?: "error" | "neutral" }>`
  ${font.caption.regular}
  color: ${({ theme, $tone = "neutral" }) =>
    $tone === "error" ? palette.red[60] : theme.label.assistive};
  line-height: 1.45;
`;

export const LoadingBlock = styled.div<{
  $width: string;
  $height: string;
  $radius?: string;
}>`
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  border-radius: ${({ $radius = "0.75rem" }) => $radius};
  ${skeletonBase}
`;

export const LoadingDescriptionStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

export const FooterActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: auto;
  padding-top: 1.5rem;
  border-top: 1px solid ${subtleBorder};
`;

export const PrimaryActionButton = styled(Button)`
  ${font.body.medium}
  min-height: 3.25rem;
  border-radius: 0.8rem;
  background-color: ${({ theme }) => theme.primary.normal};
  color: ${palette.neutral[99]};
  border: 1px solid rgba(241, 7, 10, 0.5);
  box-shadow: none;
`;

export const SecondaryActionButton = styled(Button)`
  ${font.body.medium}
  min-height: 3.25rem;
  border-radius: 0.8rem;
  background-color: ${palette.neutral[97]};
  color: ${palette.neutral[20]};
  border: 1px solid rgba(255, 255, 255, 0.14);
`;

export const QuizBody = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.875rem;
  min-height: 0;
  overflow: hidden;
`;

export const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  gap: 0.35rem;
  padding: 0;
  ${font.caption.regular}
  color: ${({ theme }) => theme.label.assistive};
  cursor: pointer;
  margin-top: 0.1rem;

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
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  padding-top: 0.1rem;
`;

export const QuizStep = styled.span`
  ${font.body.regular}
  color: ${({ theme }) => theme.primary.normal};
`;

export const QuizProgressTrack = styled.div`
  width: min(100%, 15rem);
  height: 0.45rem;
  border-radius: 999px;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.2);
`;

export const QuizCard = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  padding: 0;
  border-radius: 0;
  background-color: transparent;
  border: none;
  align-items: center;
`;

export const QuizViewport = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 1rem 0 1.25rem;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.line.normal};
    border-radius: 999px;
  }
`;

export const QuizContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  margin-block: auto;
`;

export const QuestionText = styled.div`
  width: 100%;
  max-width: 32rem;
  min-width: 0;
`;

export const QuestionPrefix = styled.span`
  ${font.title1.medium}
  color: ${({ theme }) => theme.primary.normal};
`;

export const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  width: 100%;
  align-items: center;
`;

export const OptionsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export const OptionsDivider = styled.div`
  display: flex;
  align-items: center;
  width: min(100%, 32rem);
  gap: 0.85rem;
  align-self: center;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: ${subtleBorder};
  }
`;

export const OptionsDividerLabel = styled.span`
  ${font.caption.medium}
  color: ${({ theme }) => theme.label.assistive};
  letter-spacing: 0.02em;
  white-space: nowrap;
`;

export const ResultCard = styled(QuizCard)`
  width: 100%;
  gap: 1.35rem;
  margin-block: auto;
`;

export const ResultHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  align-self: center;
  width: min(100%, 26rem);
`;

export const ResultTextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

export const ResultTitle = styled.span`
  ${font.title1.medium}
  color: ${({ theme }) => theme.label.strong};
  line-height: 1.35;
`;

export const ResultCaption = styled.span`
  ${font.body.regular}
  color: ${({ theme }) => theme.label.assistive};
  line-height: 1.55;
`;

export const ExplanationBox = styled.div`
  width: min(100%, 29rem);
  padding: 1.5rem 1.25rem;
  border-radius: 1.1rem;
  background-color: ${neutralSurface};
  border: 1px solid ${subtleBorder};
  align-self: center;
  max-height: 14rem;
  overflow: auto;
`;

export const ResultFooterActions = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 1rem;

  & > * {
    width: 100%;
    flex: none;
  }
`;

export const SummaryCard = styled(QuizCard)`
  width: 100%;
  gap: 1.15rem;
  margin-top: 0;
`;

export const FinalContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  min-height: 0;
`;

export const SummaryTitle = styled.h3`
  ${font.title1.medium}
  color: ${({ theme }) => theme.label.strong};
  line-height: 1.35;
`;

export const SummaryDescription = styled.p`
  ${font.body.regular}
  color: ${({ theme }) => theme.label.assistive};
  line-height: 1.6;
  white-space: pre-wrap;
  text-align: center;
  max-width: 26rem;
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
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;

  & > * {
    width: min(100%, 24rem);
    flex: none;
  }
`;

export const CorrectIcon = styled.img.attrs({
  src: Correct,
  alt: "",
  "aria-hidden": true,
})`
  display: block;
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
`;

export const IncorrectIcon = styled.img.attrs({
  src: InCorrect,
  alt: "",
  "aria-hidden": true,
})`
  display: block;
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
`;

export const ClearIcon = styled(Clear)`
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
`;

export const FailIcon = styled(Fail)`
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
`;
