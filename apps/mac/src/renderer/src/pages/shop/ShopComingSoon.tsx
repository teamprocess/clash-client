import * as S from "./ShopComingSoon.style";

export const ShopComingSoon = () => {
  return (
    <S.Container>
      <S.Panel>
        <S.Badge>Coming Soon</S.Badge>
        <S.Title>준비 중인 기능입니다.</S.Title>
        <S.Description>
          현재 상점 기능은 점검 및 개선 작업 중입니다.
          <br />
          업데이트 전까지는 기존 상점 화면 대신 안내 화면만 제공합니다.
        </S.Description>
      </S.Panel>
    </S.Container>
  );
};
