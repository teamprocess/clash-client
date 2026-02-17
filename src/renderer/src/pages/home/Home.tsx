import { Dialog } from "@/shared/ui";
import * as S from "./Home.style";
import { Active, Ranking, Rival, Transition } from "@/features/home";
import {
  useActiveQuery,
  useRankingQuery,
  useTransitionQuery,
  useRivalListQuery,
} from "@/entities/home";
import { useMyRivalsQuery } from "@/entities/competition";

export const Home = () => {
  const transitionQuery = useTransitionQuery();
  const myRivalQuery = useMyRivalsQuery();
  const rivalListQuery = useRivalListQuery();
  const activeQuery = useActiveQuery("GITHUB");
  const rankingQuery = useRankingQuery("GITHUB", "DAY");

  const isLoading =
    transitionQuery.isLoading ||
    myRivalQuery.isLoading ||
    rivalListQuery.isLoading ||
    activeQuery.isLoading ||
    rankingQuery.isLoading;

  return (
    <>
      {isLoading && (
        <Dialog width={21.5} height={21.5} isOpen={true}>
          <S.ConnectingContainer>
            <S.GithubIcon />
            <S.FontBox>
              <S.HugeFont>깃허브 계정을 연동 중입니다</S.HugeFont>
              <S.TinyFont>잠시만 기다려주세요.</S.TinyFont>
            </S.FontBox>
          </S.ConnectingContainer>
        </Dialog>
      )}
      <Transition data={transitionQuery.data?.data ?? null} />
      <Rival rivalsData={myRivalQuery.data?.data ?? null} />
      <Active />
      <Ranking />
    </>
  );
};
