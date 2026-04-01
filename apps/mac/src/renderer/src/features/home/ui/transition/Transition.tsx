import * as S from "./Transition.style";
import { Link } from "react-router-dom";
import { Fragment, useMemo } from "react";
import { useTransition } from "@/features/home/model/useTransition";
import { TransitionResponse } from "@/entities/home";
import { formatTime } from "@/shared/lib";

interface TransitionProps {
  data: TransitionResponse | null;
}

type Pair = {
  yesterday: number;
  today: number;
};

type Section = {
  title: string;
  leftLabel: string;
  rightLabel: string;
  leftValue: string;
  rightValue: string;
  leftRatio: number;
  rightRatio: number;
};

const getRatioPair = ({ yesterday, today }: Pair) => {
  const total = yesterday + today;

  return {
    leftRatio: total === 0 ? 0 : yesterday / total,
    rightRatio: total === 0 ? 0 : today / total,
  };
};

const GraphSection = ({
  title,
  leftLabel,
  rightLabel,
  leftValue,
  rightValue,
  leftRatio,
  rightRatio,
}: Section) => {
  return (
    <S.Content>
      <S.SubTitle>{title}</S.SubTitle>
      <S.InfoBox>
        <S.GraphContainer>
          <S.GraphBox>
            <S.Bars>
              <S.Value value={leftRatio}>{leftValue}</S.Value>
              <S.Bar value={leftRatio} />
            </S.Bars>

            <S.Bars>
              <S.Value value={rightRatio}>{rightValue}</S.Value>
              <S.Bar value={rightRatio} />
            </S.Bars>
          </S.GraphBox>
          <S.Line />
        </S.GraphContainer>

        <S.DateBox>
          <S.DateTitle>{leftLabel}</S.DateTitle>
          <S.DateTitle>{rightLabel}</S.DateTitle>
        </S.DateBox>
      </S.InfoBox>
    </S.Content>
  );
};

export const Transition = ({ data }: TransitionProps) => {
  const getTransitionData = useTransition(data);

  const sections = useMemo(() => {
    const activeTime = getTransitionData.transitionData?.activeTime;
    const contributors = getTransitionData.transitionData?.contributors;

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
  }, [getTransitionData.transitionData]);

  return (
    <S.TransitionContainer>
      <S.TitleBox>
        <S.Title>어제와 비교</S.Title>
        <Link to="/home/transition">
          <S.ArrowBox>
            자세히보기
            <S.DetailArrowIcon />
          </S.ArrowBox>
        </Link>
      </S.TitleBox>

      <S.ContentContainer>
        <S.ContentBox>
          {sections.map((section, index) => (
            <Fragment key={section.title}>
              <GraphSection {...section} />
              {index === 0 && <S.VerticalLine />}
            </Fragment>
          ))}
        </S.ContentBox>
      </S.ContentContainer>
    </S.TransitionContainer>
  );
};
