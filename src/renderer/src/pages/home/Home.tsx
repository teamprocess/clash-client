import { Dialog } from "@/shared/ui";
import * as S from "./Home.style";
import { Active, Ranking, Rival, Transition } from "@/features/home";
import { useTransitionQuery } from "@/entities/home";
import { useMyRivalsQuery } from "@/entities/competition";
import { Suspense } from "react";

export const Home = () => {
  const transitionQuery = useTransitionQuery();
  const myRivalQuery = useMyRivalsQuery();

  return (
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
      <Transition data={transitionQuery.data?.data ?? null} />
      <Rival rivalsData={myRivalQuery.data?.data ?? null} />
      <Active />
      <Ranking />
    </Suspense>
  );
};
