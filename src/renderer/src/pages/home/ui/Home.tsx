import { useEffect } from "react";
import { Active, Ranking, Rival, Transition } from "@/features/home";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Dialog } from "@/shared/ui";
import { Skeleton } from "@/shared/ui/skeleton/Skeleton";
import * as S from "./Home.style";
import { useActiveQuery, useTransitionQuery } from "@/entities/home";
import { useGetMyProfile } from "@/entities/user";

const isNotFound = (error: unknown) => axios.isAxiosError(error) && error.response?.status === 404;
const PROFILE_SYNC_UNTIL_KEY = "clash:user:profile-sync-until";

const isProfileSyncing = () => {
  if (typeof window === "undefined") {
    return false;
  }

  const raw = window.sessionStorage.getItem(PROFILE_SYNC_UNTIL_KEY);
  if (!raw) {
    return false;
  }

  const until = Number(raw);
  return Number.isFinite(until) && Date.now() < until;
};

const clearProfileSyncWindow = () => {
  if (typeof window === "undefined") {
    return;
  }
  window.sessionStorage.removeItem(PROFILE_SYNC_UNTIL_KEY);
};

export const Home = () => {
  const queryClient = useQueryClient();
  const transitionQuery = useTransitionQuery();
  const activeQuery = useActiveQuery("GITHUB");
  const { data: user } = useGetMyProfile();

  const isChecking = transitionQuery.isPending || activeQuery.isPending;
  const isGithubNotLinked = Boolean(user && !user.githubLinked);
  const shouldSyncProfile = isProfileSyncing();
  const activeStreakCount = activeQuery.data?.data?.streaks?.length ?? 0;
  const hasTransitionData = Boolean(transitionQuery.data?.success && transitionQuery.data.data);
  const hasActiveData = Boolean(activeQuery.data?.success && activeStreakCount > 0);
  const hasHomeData = hasTransitionData && hasActiveData;

  useEffect(() => {
    if (!hasHomeData) {
      return;
    }
    clearProfileSyncWindow();
  }, [hasHomeData]);

  const isTransitionNotReady = transitionQuery.isError && isNotFound(transitionQuery.error);
  const isActiveNotReady = activeQuery.isError && isNotFound(activeQuery.error);
  const isSyncingWithoutData = shouldSyncProfile && !hasHomeData;
  const isGithubNotReady = isTransitionNotReady || isActiveNotReady || isSyncingWithoutData;
  const shouldPollGithubData = !isChecking && !isGithubNotLinked && isGithubNotReady;

  useEffect(() => {
    if (!shouldPollGithubData) {
      return;
    }

    const interval = setInterval(() => {
      void Promise.all([
        queryClient.invalidateQueries({ queryKey: ["transition"] }),
        queryClient.invalidateQueries({ queryKey: ["active", "GITHUB"] }),
      ]);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [queryClient, shouldPollGithubData]);

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
                <S.TinyFont>최대 3분 정도 소요될 수 있습니다.</S.TinyFont>
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
