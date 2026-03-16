import * as S from "./MissionContainer.style";
import { useEffect, useRef, useState } from "react";
import { SidePanel } from "@/shared/ui";
import { getErrorMessage } from "@/shared/lib";
import type { Mission } from "@/features/chapter/model/chapter.types";
import { useQuiz } from "../model/useQuiz";
import { AnswerOptionButton } from "../ui/AnswerOptionButton";

const CLOSE_ANIMATION_MS = 220;

interface CurrentStageMeta {
  title: string;
  currentProgress: number;
  totalMissions: number;
}

interface MissionContainerProps {
  isOpen: boolean;
  currentStage: CurrentStageMeta;
  currentMission: Mission | null;
  description: string | null;
  isLoading: boolean;
  isSolveDisabled: boolean;
  studyMaterialUrl: string | null;
  onClose: () => void;
  onSolve: () => void;
  onBackToOverview: () => void;
  onMissionComplete?: (missionId: number) => void;
}

interface QuizPanelContentProps {
  mission: Mission;
  stageTitle: string;
  onBackToOverview: () => void;
  onMissionComplete?: (missionId: number) => void;
}

const QuizPanelContent = ({
  mission,
  stageTitle,
  onBackToOverview,
  onMissionComplete,
}: QuizPanelContentProps) => {
  const {
    state,
    error,
    questions,
    currentQuestion,
    selectedChoiceId,
    handleSelectChoice,
    handleConfirm,
    handleNextOrClose,
    handleRestart,
    handleClose,
  } = useQuiz({
    mission,
    onMissionComplete,
    onClose: onBackToOverview,
  });

  const quizProgressPercent =
    questions.length > 0 ? ((state.currentIndex + 1) / questions.length) * 100 : 0;

  if (!currentQuestion || questions.length === 0) {
    return (
      <S.QuizBody>
        <S.BackButton type="button" onClick={onBackToOverview}>
          <S.BackArrow>‹</S.BackArrow>
          챕터 정보
        </S.BackButton>
        <S.QuizViewport>
          <S.ResultCard>
            <S.ResultHeader>
              <S.IncorrectIcon />
              <S.ResultTextGroup>
                <S.ResultTitle>문제 정보를 불러오지 못했습니다.</S.ResultTitle>
                <S.ResultCaption>잠시 후 다시 시도해주세요.</S.ResultCaption>
              </S.ResultTextGroup>
            </S.ResultHeader>
          </S.ResultCard>
        </S.QuizViewport>
      </S.QuizBody>
    );
  }

  if (state.view === "result") {
    return (
      <S.QuizBody>
        <S.QuizProgress>
          <S.QuizProgressTrack aria-hidden>
            <S.ProgressFill $value={quizProgressPercent} />
          </S.QuizProgressTrack>
          <S.QuizStep>
            {state.currentIndex + 1} / {questions.length}
          </S.QuizStep>
        </S.QuizProgress>

        <S.BackButton type="button" onClick={onBackToOverview}>
          <S.BackArrow>‹</S.BackArrow>
          챕터 정보
        </S.BackButton>

        <S.QuizViewport>
          <S.ResultCard>
            <S.ResultHeader>
              {state.lastResult ? <S.CorrectIcon /> : <S.IncorrectIcon />}
              <S.ResultTextGroup>
                <S.ResultTitle>{state.lastResult ? "정답입니다." : "오답입니다."}</S.ResultTitle>
                <S.ResultCaption>해설을 확인하고 다음 문제로 넘어가세요.</S.ResultCaption>
              </S.ResultTextGroup>
            </S.ResultHeader>

            <S.ExplanationBox>
              <S.ExplanationText>
                {state.explanation || "해설이 제공되지 않았습니다."}
              </S.ExplanationText>
            </S.ExplanationBox>
          </S.ResultCard>
        </S.QuizViewport>

        <S.ResultFooterActions>
          <S.PrimaryActionButton variant="primary" size="lg" fullWidth onClick={handleNextOrClose}>
            {state.currentIndex === questions.length - 1 ? "결과 보기" : "다음 문제로"}
          </S.PrimaryActionButton>
        </S.ResultFooterActions>
      </S.QuizBody>
    );
  }

  if (state.view === "final") {
    const isPassed =
      state.isPassed ?? (questions.length > 0 && state.correctCount === questions.length);
    const finalProgressPercent = questions.length > 0 ? 100 : 0;

    return (
      <S.QuizBody>
        <S.QuizProgress>
          <S.QuizProgressTrack aria-hidden>
            <S.ProgressFill $value={finalProgressPercent} />
          </S.QuizProgressTrack>
          <S.QuizStep>
            {questions.length} / {questions.length}
          </S.QuizStep>
        </S.QuizProgress>

        <S.BackButton type="button" onClick={handleClose}>
          <S.BackArrow>‹</S.BackArrow>
          챕터 정보
        </S.BackButton>
        <S.FinalContent>
          <S.SummaryCard>
            {isPassed ? <S.ClearIcon /> : <S.FailIcon />}
            <S.SummaryTitle>{isPassed ? "문제 풀이 완료" : "다시 도전해보세요"}</S.SummaryTitle>
            <S.SummaryScore>
              {state.correctCount}
              <S.SummaryScoreTotal>/ {questions.length}</S.SummaryScoreTotal>
            </S.SummaryScore>
            <S.SummaryDescription>
              {isPassed
                ? `${stageTitle}의 문제 풀이를 모두 마쳤습니다.`
                : `${stageTitle} 문제를 다시 풀어볼 수 있습니다.`}
            </S.SummaryDescription>
            {error && <S.InlineMessage $tone="error">{error}</S.InlineMessage>}
          </S.SummaryCard>

          <S.ButtonRow>
            {!isPassed && (
              <S.SecondaryActionButton
                variant="secondary"
                size="lg"
                fullWidth
                onClick={handleRestart}
              >
                다시하기
              </S.SecondaryActionButton>
            )}
            <S.PrimaryActionButton variant="primary" size="lg" fullWidth onClick={handleClose}>
              챕터 보기
            </S.PrimaryActionButton>
          </S.ButtonRow>
        </S.FinalContent>
      </S.QuizBody>
    );
  }

  return (
    <S.QuizBody>
      <S.QuizProgress>
        <S.QuizProgressTrack aria-hidden>
          <S.ProgressFill $value={quizProgressPercent} />
        </S.QuizProgressTrack>
        <S.QuizStep>
          {state.currentIndex + 1} / {questions.length}
        </S.QuizStep>
      </S.QuizProgress>

      <S.BackButton type="button" onClick={onBackToOverview}>
        <S.BackArrow>‹</S.BackArrow>
        챕터 정보
      </S.BackButton>

      <S.QuizViewport>
        <S.QuizContent>
          <S.QuizCard>
            <S.QuestionText><span>Q.</span> {currentQuestion.content}</S.QuestionText>
          </S.QuizCard>

          <S.OptionList>
            {currentQuestion.choices.map(choice => (
              <AnswerOptionButton
                key={choice.id}
                id={choice.id}
                content={choice.content}
                selectedId={selectedChoiceId}
                onSelect={handleSelectChoice}
              />
            ))}
          </S.OptionList>
        </S.QuizContent>
      </S.QuizViewport>

      <S.FooterActions>
        <S.PrimaryActionButton
          variant="primary"
          size="lg"
          onClick={() => void handleConfirm()}
          disabled={!selectedChoiceId || state.isSubmitting}
          fullWidth
        >
          {state.isSubmitting ? "제출 중..." : "선택 완료하기"}
        </S.PrimaryActionButton>
        {error && <S.InlineMessage $tone="error">{error}</S.InlineMessage>}
        {error && (
          <S.SecondaryActionButton
            variant="secondary"
            size="lg"
            onClick={() => void handleRestart()}
            fullWidth
          >
            챕터 다시 시작하기
          </S.SecondaryActionButton>
        )}
      </S.FooterActions>
    </S.QuizBody>
  );
};

export const MissionContainer = ({
  isOpen,
  currentStage,
  currentMission,
  description,
  isLoading,
  isSolveDisabled,
  studyMaterialUrl,
  onClose,
  onSolve,
  onBackToOverview,
  onMissionComplete,
}: MissionContainerProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const [studyMaterialError, setStudyMaterialError] = useState<string | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current !== null) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const handleRequestClose = () => {
    if (isClosing) return;

    setIsClosing(true);
    closeTimeoutRef.current = window.setTimeout(() => {
      closeTimeoutRef.current = null;
      onClose();
    }, CLOSE_ANIMATION_MS);
  };

  const handleOpenStudyMaterial = async () => {
    const url = studyMaterialUrl?.trim();

    if (!url) {
      setStudyMaterialError("연결된 학습 자료가 아직 없습니다.");
      return;
    }

    if (typeof window === "undefined" || !window.api?.openExternalUrl) {
      setStudyMaterialError("브라우저를 열 수 없는 환경입니다.");
      return;
    }

    try {
      setStudyMaterialError(null);
      await window.api.openExternalUrl(url);
    } catch (error: unknown) {
      setStudyMaterialError(getErrorMessage(error, "학습 자료를 여는 중 오류가 발생했습니다."));
    }
  };

  const descriptionText = isLoading
    ? "챕터 정보를 불러오는 중입니다."
    : description?.trim() || "이 챕터에 대한 설명이 아직 준비되지 않았습니다.";
  const progressPercent =
    currentStage.totalMissions > 0
      ? Math.min((currentStage.currentProgress / currentStage.totalMissions) * 100, 100)
      : 0;
  const hasStudyMaterial = Boolean(studyMaterialUrl?.trim());
  const isOverviewLoading = isLoading && !currentMission;
  const materialMessage =
    studyMaterialError ?? (!hasStudyMaterial ? "현재 챕터에는 연결된 학습 자료가 없습니다." : null);

  return (
    <SidePanel
      isOpen={isOpen}
      isClosing={isClosing}
      onClose={handleRequestClose}
      width="min(100vw, 46rem)"
      position="fixed"
    >
      <S.PanelContent>
        <S.PanelHeader>
          <S.HeaderMain>{!currentMission && <S.HeaderTitle>{currentStage.title}</S.HeaderTitle>}</S.HeaderMain>

          <S.HeaderActions>
            <S.IconButton type="button" onClick={handleRequestClose} aria-label="챕터 패널 닫기">
              <S.CloseIcon aria-hidden />
            </S.IconButton>
          </S.HeaderActions>
        </S.PanelHeader>

        {currentMission ? (
          <QuizPanelContent
            mission={currentMission}
            stageTitle={currentStage.title}
            onBackToOverview={onBackToOverview}
            onMissionComplete={onMissionComplete}
          />
        ) : (
          <>
            <S.OverviewBody>
              <S.SectionCard>
                <S.SectionTitle>진행 상태</S.SectionTitle>
                {isOverviewLoading ? (
                  <>
                    <S.LoadingBlock $width="6rem" $height="2rem" $radius="0.5rem" />
                    <S.LoadingBlock $width="100%" $height="0.5rem" $radius="999px" />
                  </>
                ) : (
                  <>
                    <S.ProgressSummary>
                      <S.ProgressCurrent>{currentStage.currentProgress}</S.ProgressCurrent>
                      <S.ProgressTotal>/ {currentStage.totalMissions || 0}</S.ProgressTotal>
                    </S.ProgressSummary>

                    <S.ProgressTrack aria-hidden>
                      <S.ProgressFill $value={progressPercent} />
                    </S.ProgressTrack>
                  </>
                )}
              </S.SectionCard>

              <S.SectionCard>
                <S.SectionTitle>챕터 설명</S.SectionTitle>
                {isOverviewLoading ? (
                  <S.LoadingDescriptionStack>
                    <S.LoadingBlock $width="100%" $height="0.95rem" $radius="0.45rem" />
                    <S.LoadingBlock $width="92%" $height="0.95rem" $radius="0.45rem" />
                    <S.LoadingBlock $width="78%" $height="0.95rem" $radius="0.45rem" />
                  </S.LoadingDescriptionStack>
                ) : (
                  <S.DescriptionText>{descriptionText}</S.DescriptionText>
                )}
              </S.SectionCard>
            </S.OverviewBody>

            <S.FooterActions>
              {isOverviewLoading ? (
                <>
                  <S.LoadingBlock $width="48%" $height="0.8rem" $radius="0.45rem" />
                  <S.LoadingBlock $width="100%" $height="3.25rem" $radius="0.8rem" />
                  <S.LoadingBlock $width="100%" $height="3.25rem" $radius="0.8rem" />
                </>
              ) : (
                <>
                  {materialMessage && (
                    <S.InlineMessage $tone={studyMaterialError ? "error" : "neutral"}>
                      {materialMessage}
                    </S.InlineMessage>
                  )}
                  <S.PrimaryActionButton
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={() => void handleOpenStudyMaterial()}
                    disabled={isLoading || !hasStudyMaterial}
                  >
                    학습하러 가기
                  </S.PrimaryActionButton>
                  <S.SecondaryActionButton
                    variant="secondary"
                    size="lg"
                    fullWidth
                    onClick={onSolve}
                    disabled={isSolveDisabled}
                  >
                    문제 풀러 가기
                  </S.SecondaryActionButton>
                </>
              )}
            </S.FooterActions>
          </>
        )}
      </S.PanelContent>
    </SidePanel>
  );
};
