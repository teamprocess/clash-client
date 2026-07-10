import { useEffect } from "react";
import { Active, Ranking, Transition } from "@/features/home";
import { Rival } from "@/widgets/home-rivals";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Dialog } from "@/shared/ui";
import { Skeleton } from "@/shared/ui/skeleton";
import * as S from "./Home.style";
import {
  activeQueryKeys,
  transitionQueryKeys,
  useActiveQuery,
  useTransitionQuery,
} from "@/entities/competition";
import {
  PROFILE_SYNC_INTERVAL_MS,
  PROFILE_SYNC_UNTIL_KEY,
  userQueryKeys,
  useGetMyProfile,
} from "@/entities/user";

const isNotFound = (error: unknown) => axios.isAxiosError(error) && error.response?.status === 404;

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
  const isGitHubNotLinked = Boolean(user && !user.githubLinked);
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
  const isGitHubNotReady = isTransitionNotReady || isActiveNotReady || isSyncingWithoutData;
  const shouldPollGitHubData = !isChecking && !isGitHubNotLinked && isGitHubNotReady;

  useEffect(() => {
    if (!shouldSyncProfile) {
      return;
    }

    const interval = setInterval(() => {
      void queryClient.invalidateQueries({ queryKey: userQueryKeys.all });
    }, PROFILE_SYNC_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [queryClient, shouldSyncProfile]);

  useEffect(() => {
    if (!shouldPollGitHubData) {
      return;
    }

    const interval = setInterval(() => {
      void Promise.all([
        queryClient.invalidateQueries({ queryKey: transitionQueryKeys.transition }),
        queryClient.invalidateQueries({ queryKey: activeQueryKeys.active("GITHUB") }),
      ]);
    }, PROFILE_SYNC_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [queryClient, shouldPollGitHubData]);

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

  if (isGitHubNotReady) {
    return (
      <>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        {!isGitHubNotLinked && (
          <Dialog width={21.5} height={21.5} isOpen={true}>
            <S.ConnectingContainer>
              <S.GitHubIcon />
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
