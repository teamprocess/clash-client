import { formatTime } from "@/shared/lib";
import { TransitionResponse } from "@/entities/home";

export type Section = {
  title: string;
  leftLabel: string;
  rightLabel: string;
  leftValue: string;
  rightValue: string;
  leftRatio: number;
  rightRatio: number;
};

type Pair = {
  yesterday: number;
  today: number;
};

export const getRatioPair = ({ yesterday, today }: Pair) => {
  const total = yesterday + today;

  return {
    leftRatio: total === 0 ? 0 : yesterday / total,
    rightRatio: total === 0 ? 0 : today / total,
  };
};

export const createTransitionSections = (transitionData: TransitionResponse): Section[] => {
  const activeTime = transitionData?.activeTime;
  const contributors = transitionData?.contributors;

  const yesterdayTime = activeTime?.yesterdayActiveTime ?? 0;
  const todayTime = activeTime?.todayActiveTime ?? 0;

  const yesterdayContributors = contributors?.yesterdayContributors ?? 0;
  const todayContributors = contributors?.todayContributors ?? 0;

  const timeRatios = getRatioPair({
    yesterday: yesterdayTime,
    today: todayTime,
  });

  const contributorRatios = getRatioPair({
    yesterday: yesterdayContributors,
    today: todayContributors,
  });

  return [
    {
      title: "활동 시간",
      leftLabel: "어제",
      rightLabel: "오늘",
      leftValue: formatTime(yesterdayTime),
      rightValue: formatTime(todayTime),
      leftRatio: timeRatios.leftRatio,
      rightRatio: timeRatios.rightRatio,
    },
    {
      title: "Contributions",
      leftLabel: "어제",
      rightLabel: "오늘",
      leftValue: String(yesterdayContributors),
      rightValue: String(todayContributors),
      leftRatio: contributorRatios.leftRatio,
      rightRatio: contributorRatios.rightRatio,
    },
  ];
};
