import * as S from "./TestResult.style";
import { ResultProps } from "@/features/major-choice/model/useMajorChoice";

const majorIcons = {
  Web: S.WebIcon,
  App: S.AppIcon,
  Server: S.ServerIcon,
  AI: S.AiIcon,
  Game: S.GameIcon,
};

export const TestResult = ({ analyzedMajor, username, setStep }: ResultProps) => {
  const MajorIcon = majorIcons[analyzedMajor as keyof typeof majorIcons] || S.WebIcon;

  return (
    <S.ResultContainer>
      <S.ResultContents>
        <S.ResultContentsTop>
          <S.ResultTitle>당신의 전공성향은 {analyzedMajor}입니다!</S.ResultTitle>
          <S.ResultDescription>
            {username}님께 최적화된 전공 {analyzedMajor}를 찾았습니다.
            <br />
            해당 분야의 로드맵을 확인하고 학습을 시작해보세요!
          </S.ResultDescription>
        </S.ResultContentsTop>

        <S.ResultCard>
          <MajorIcon />
          <S.ResultMajor>{analyzedMajor}</S.ResultMajor>
        </S.ResultCard>

        <S.ButtonGroup>
          <S.Button $buttonType="retry" onClick={() => setStep("TEST")}>
            다시 검사하기
          </S.Button>
          <S.Button $buttonType="start" onClick={() => setStep("FEATURE")}>
            로드맵 시작하기
          </S.Button>
        </S.ButtonGroup>
      </S.ResultContents>
    </S.ResultContainer>
  );
};
