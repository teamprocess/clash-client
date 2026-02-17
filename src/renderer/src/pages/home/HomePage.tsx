import * as S from "./HomePage.style";
import { Home } from "@/pages/home/Home";
import { Suspense } from "react";
import { Dialog } from "@/shared/ui";

export const HomePage = () => {
  return (
    <S.HomeContainer>
      <Suspense
        fallback={
          <Dialog width={21.5} height={21.5} isOpen={true}>
            <S.ConnectingContainer>
              <S.GithubIcon />
              <S.FontBox>
                <S.HugeFont>깃허브 계정을 연동 중입니다</S.HugeFont>
                <S.TinyFont>잠시만 기다려주세요.</S.TinyFont>
              </S.FontBox>
            </S.ConnectingContainer>
          </Dialog>
        }
      >
        <Home />
      </Suspense>
    </S.HomeContainer>
  );
};
