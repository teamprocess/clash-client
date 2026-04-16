import { useStartupGate, type StartupUpdateState } from "@/features/startup-update";
import * as S from "./StartupGatePage.style";

interface StartupGatePageProps {
  state: StartupUpdateState;
  windowMode?: "app" | "launcher";
  onRetry?: () => Promise<void>;
}

export const StartupGatePage = ({ state, windowMode = "app", onRetry }: StartupGatePageProps) => {
  const view = useStartupGate(state, onRetry);

  if (view.isReady && windowMode === "app") {
    return (
      <S.StartingContainer>
        <S.StartingBox role="status" aria-live="polite">
          <S.StartingIcon focusable="false" aria-hidden />
        </S.StartingBox>
        <S.StartingActionBox>
          <S.StartingTitle>{view.title}</S.StartingTitle>
          <S.StartingDescription>{view.description}</S.StartingDescription>
        </S.StartingActionBox>
      </S.StartingContainer>
    );
  }

  return (
    <S.StartupContainer $windowMode={windowMode}>
      {windowMode === "app" ? <S.AmbientGlow aria-hidden /> : null}
      <S.Panel $windowMode={windowMode} role="status" aria-live="polite">
        <S.IconBox>
          <S.LoadingIcon focusable="false" />
        </S.IconBox>
        <S.Content>
          <S.Title>{view.title}</S.Title>
          <S.Description>{view.description}</S.Description>
        </S.Content>
        {view.isDownloading ? (
          <S.ProgressSection>
            <S.ProgressTrack>
              <S.ProgressFill $progressPercent={view.progressPercent} />
            </S.ProgressTrack>
            <S.ProgressMeta>
              <span>{view.progressPercent}%</span>
            </S.ProgressMeta>
          </S.ProgressSection>
        ) : null}
        {view.isError ? (
          <S.ActionRow>
            <S.RetryButton
              variant="primary"
              size="sm"
              isLoading={view.isRetrying}
              onClick={() => view.retry()}
            >
              다시 시도
            </S.RetryButton>
          </S.ActionRow>
        ) : null}
      </S.Panel>
    </S.StartupContainer>
  );
};
