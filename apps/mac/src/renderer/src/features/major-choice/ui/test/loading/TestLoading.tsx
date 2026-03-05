import { useEffect, useState } from "react";
import * as S from "./TestLoading.style";

export const Loading = () => {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev === 3 ? 0 : prev + 1));
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <S.LoadingContainer>
      <S.LoadingContents>
        <S.LoadingIcon />
        <S.TextGroup>
          <S.LoadingStatus>결과 분석중{".".repeat(dots)}</S.LoadingStatus>
          <S.LoadingLabel>잠시만 기다리시면 더 맞는 전공을 추천해드리겠습니다</S.LoadingLabel>
        </S.TextGroup>
      </S.LoadingContents>
    </S.LoadingContainer>
  );
};
