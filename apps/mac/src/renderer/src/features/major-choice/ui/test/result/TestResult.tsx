import * as S from "./TestResult.style";
import { ResultProps } from "@/features/major-choice/model/useMajorChoice";
import { Button } from "@/shared/ui/button";
import { majorLabels } from "@/features/major-choice/model/major.constants";

const majorIcons = {
  WEB: S.WebIcon,
  SERVER: S.ServerIcon,
};

export const TestResult = ({ analyzedMajor, username, setStep }: ResultProps) => {
  const MajorIcon = majorIcons[analyzedMajor as keyof typeof majorIcons] || S.WebIcon;
  const majorLabel = analyzedMajor ? majorLabels[analyzedMajor] : "";

  return (
    <S.ResultContainer>
      <S.ResultContents>
        <S.ResultContentsTop>
          <S.ResultTitle>당신의 전공성향은 {majorLabel}입니다!</S.ResultTitle>
          <S.ResultDescription>
            {username}님께 최적화된 전공 {majorLabel}를 찾았습니다.
            <br />
            해당 분야의 로드맵을 확인하고 학습을 시작해보세요!
          </S.ResultDescription>
        </S.ResultContentsTop>

        <S.ResultCard>
          <MajorIcon />
          <S.ResultMajor>{majorLabel}</S.ResultMajor>
        </S.ResultCard>

        <S.ButtonGroup>
          <Button variant="secondary" size="lg" onClick={() => setStep("TEST")}>
            다시 검사하기
          </Button>
          <Button variant="primary" size="lg" onClick={() => setStep("CHOICE")}>
            전공 선택하기
          </Button>
        </S.ButtonGroup>
      </S.ResultContents>
    </S.ResultContainer>
  );
};
