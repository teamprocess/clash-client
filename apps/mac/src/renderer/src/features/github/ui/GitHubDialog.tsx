import * as S from "./GitHubDialog.style";
import { Button, Dialog } from "@/shared/ui";

interface GitHubDialogProps {
  isOpen: boolean;
  isConnecting: boolean;
  error: string | null;
  onStartGitHubConnect: () => void;
  onSignOut: () => void;
  isSigningOut: boolean;
  signOutError: string | null;
}

export const GitHubDialog = ({
  isOpen,
  isConnecting,
  error,
  onStartGitHubConnect,
  onSignOut,
  isSigningOut,
  signOutError,
}: GitHubDialogProps) => {
  const isBusy = isConnecting || isSigningOut;
  const connectButtonLabel = isConnecting
    ? "GitHub 연동 중..."
    : error
      ? "다시 시도"
      : "GitHub 연동하기";

  return (
    <Dialog
      title="GitHub 연동이 필요합니다"
      width={28}
      height={15}
      isOpen={isOpen}
      showClose={false}
      gap={1.25}
    >
      <S.Content>
        <S.MessageBox>
          <S.Description>
            Clash 서비스를 이용하려면 GitHub 계정 연동이 필요합니다.
            <br />
            연동 완료 전에는 서비스를 사용할 수 없습니다.
          </S.Description>
          <S.SubDescription>
            버튼을 누르면 브라우저에서 GitHub 인증 후 앱으로 자동 복귀합니다.
          </S.SubDescription>
          {error && <S.ErrorText>{error}</S.ErrorText>}
          {signOutError && <S.ErrorText>{signOutError}</S.ErrorText>}
        </S.MessageBox>
        <S.Actions>
          <Button
            type="button"
            variant="secondary"
            size="lg"
            fullWidth
            onClick={onSignOut}
            disabled={isBusy}
          >
            {isSigningOut ? "로그아웃 중..." : "로그아웃"}
          </Button>
          <Button
            type="button"
            variant="primary"
            size="lg"
            fullWidth
            onClick={onStartGitHubConnect}
            disabled={isBusy}
          >
            {connectButtonLabel}
          </Button>
        </S.Actions>
      </S.Content>
    </Dialog>
  );
};
