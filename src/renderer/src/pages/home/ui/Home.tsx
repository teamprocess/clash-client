import { Active, Ranking, Rival, Transition } from "@/features/home";
import axios from "axios";
import { Dialog } from "@/shared/ui";
import { Skeleton } from "@/shared/ui/skeleton/Skeleton";
import * as S from "./Home.style";
import { StreakItem, useActiveQuery, useTransitionQuery } from "@/entities/home";
import { useGetMyProfile } from "@/entities/user";

const isNotFound = (error: unknown) => axios.isAxiosError(error) && error.response?.status === 404;

export const Home = () => {
  const transitionQuery = useTransitionQuery();
  const activeQuery = useActiveQuery("GITHUB");
  const { data: user } = useGetMyProfile();

  const isChecking = transitionQuery.isPending || activeQuery.isPending;

  if (isChecking) {
    return (
      <>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </>
    );
  }

  const activeStreaks: StreakItem[] | undefined = activeQuery.data?.data?.streaks;

  const isGithubNotReady =
    (transitionQuery.isError && isNotFound(transitionQuery.error)) || !activeStreaks?.length;
  const isGithubNotLinked = Boolean(user && !user.githubLinked);

  if (isGithubNotReady) {
    return (
      <>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        {!isGithubNotLinked && (
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
      </>
    );
  }

  return (
    <>
      <Transition data={transitionQuery.data?.data ?? null} />
      <Rival />
      <Active activeData={activeQuery.data?.data ?? null} />
      <Ranking />
    </>
  );
};
