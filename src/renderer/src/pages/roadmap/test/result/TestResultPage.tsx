import { useLocation, useNavigate } from "react-router-dom";
import * as S from "./TestResultPage.style";

const username = "조상철";

const majorIcons = {
  Web: S.WebIcon,
  App: S.AppIcon,
  Server: S.ServerIcon,
  AI: S.AiIcon,
  Game: S.GameIcon,
};

export const TestResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const major = location.state?.major || "Web";
  const MajorIcon = majorIcons[major as keyof typeof majorIcons] || S.WebIcon;

  return (
    <S.ResultContainer>
      <S.ResultContents>
        <S.ResultContentsTop>
          <S.ResultTitle>당신의 전공성향은 {major}입니다!</S.ResultTitle>
          <S.ResultDescription>
            {username}님께 최적화된 전공 {major}를 찾았습니다.
            <br />
            해당 분야의 로드맵을 확인하고 학습을 시작해보세요!
          </S.ResultDescription>
        </S.ResultContentsTop>

        <S.ResultCard>
          <MajorIcon />
          <S.ResultMajor>{major}</S.ResultMajor>
        </S.ResultCard>

        <S.ButtonGroup>
          <S.Button $buttonType="retry" onClick={() => navigate("/roadmap/test")}>
            다시 검사하기
          </S.Button>
          <S.Button $buttonType="start" onClick={() => navigate("/roadmap")}>
            로드맵 시작하기
          </S.Button>
        </S.ButtonGroup>
      </S.ResultContents>
    </S.ResultContainer>
  );
};
