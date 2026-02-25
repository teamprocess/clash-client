import * as S from "./NotFoundPage.style";

export const NotFoundPage = () => {
  return (
    <S.NotFoundContainer>
      <S.NotFoundInfo>
        <S.NotFoundIcon />
        <S.NotFoundText>페이지를 찾을 수 없습니다.</S.NotFoundText>
      </S.NotFoundInfo>
      <S.LinkToMain to="/">메인 화면으로 가기</S.LinkToMain>
    </S.NotFoundContainer>
  );
};
