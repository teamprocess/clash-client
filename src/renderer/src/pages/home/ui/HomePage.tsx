import { Suspense } from "react";
import { Home } from "../Home";
import { Dialog } from "@/shared/ui";
import { Skeleton } from "@/shared/ui/skeleton/Skeleton";
import * as S from "./HomePage.style";

const HomeFallback = () => {
  return (
    <>
      <S.HomeContainer>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </S.HomeContainer>

      <Dialog width={21.5} height={21.5} isOpen={true}>
        <S.ConnectingContainer>
          <S.GithubIcon />
          <S.FontBox>
            <S.HugeFont>데이터를 불러오는 중입니다</S.HugeFont>
            <S.TinyFont>잠시만 기다려주세요.</S.TinyFont>
          </S.FontBox>
        </S.ConnectingContainer>
      </Dialog>
    </>
  );
};

export const HomePage = () => {
  return (
    <Suspense fallback={<HomeFallback />}>
      <S.HomeContainer>
        <Home />
      </S.HomeContainer>
    </Suspense>
  );
};
