import * as S from "./NotFoundPage.style";
import { useSignOut } from "@/features/auth";

export const NotFoundPage = () => {
  const { signOut, isLoading } = useSignOut();

  return (
    <S.NotFoundContainer>
      <S.NotFoundInfo>
        <S.NotFoundIcon />
        <S.NotFoundText>페이지를 찾을 수 없습니다.</S.NotFoundText>
      </S.NotFoundInfo>
      <S.LinkToMain to="/">메인 화면으로 가기</S.LinkToMain>
      <S.SignOutButton onClick={signOut} disabled={isLoading}>
        {isLoading ? "로그아웃 중..." : "로그아웃"}
      </S.SignOutButton>
    </S.NotFoundContainer>
  );
};
