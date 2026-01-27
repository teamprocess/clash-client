import { useEffect, useState } from "react";
import { transitionApi } from "@/entities/home/api/transitionApi";
import { TransitionResponse } from "@/entities/home/model/useTransition.types";

export const useTransition = () => {
  const [transitionData, setTransitionData] = useState<TransitionResponse | null>(null);

  const maxActive = Math.max(
    transitionData?.activeTime.yesterdayActiveTime ?? 0,
    transitionData?.activeTime.todayActiveTime ?? 0
  );

  const maxContributors = Math.max(
    transitionData?.contributors.yesterdayContributors ?? 0,
    transitionData?.contributors.todayContributors ?? 0
  );

  useEffect(() => {
    const fetchTransition = async () => {
      try {
        const response = await transitionApi.getTransition();
        if (!response.data) return;
        setTransitionData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTransition();
  }, []);

  return {
    transition: {
      transitionData,
      maxActive,
      maxContributors,
    },
  };
};

export type UseTransitionReturn = ReturnType<typeof useTransition>;
export type TransitionProps = UseTransitionReturn["transition"];
