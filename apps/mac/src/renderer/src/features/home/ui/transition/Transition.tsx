import * as S from "./Transition.style";
import { Link } from "react-router-dom";
import { useTransition } from "@/features/home/model/useTransition";
import { TransitionResponse } from "@/entities/home";
import { formatTime } from "@/shared/lib";

interface TransitionProps {
  data: TransitionResponse | null;
}

export const Transition = ({ data }: TransitionProps) => {
  const getTransitionData = useTransition(data);

  const yesterdayTime = getTransitionData.transitionData?.activeTime.yesterdayActiveTime ?? 0;

  const todayTime = getTransitionData.transitionData?.activeTime.todayActiveTime ?? 0;

  const yesterdayContributors =
    getTransitionData.transitionData?.contributors.yesterdayContributors ?? 0;

  const todayContributors = getTransitionData.transitionData?.contributors.todayContributors ?? 0;

  const timeTotal = yesterdayTime + todayTime;
  const timeYesterdayRatio = timeTotal === 0 ? 0 : yesterdayTime / timeTotal;
  const timeTodayRatio = timeTotal === 0 ? 0 : todayTime / timeTotal;

  const contribTotal = yesterdayContributors + todayContributors;
  const contribYesterdayRatio = contribTotal === 0 ? 0 : yesterdayContributors / contribTotal;
  const contribTodayRatio = contribTotal === 0 ? 0 : todayContributors / contribTotal;

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
          <S.Content>
            <S.SubTitle>활동 시간</S.SubTitle>
            <S.InfoBox>
              <S.GraphContainer>
                <S.GraphBox>
                  <S.Bars>
                    <S.Value value={timeYesterdayRatio}>{formatTime(yesterdayTime)}</S.Value>
                    <S.Bar value={timeYesterdayRatio} />
                  </S.Bars>

                  <S.Bars>
                    <S.Value value={timeTodayRatio}>{formatTime(todayTime)}</S.Value>
                    <S.Bar value={timeTodayRatio} />
                  </S.Bars>
                </S.GraphBox>
                <S.Line />
              </S.GraphContainer>

              <S.DateBox>
                <S.DateTitle>어제</S.DateTitle>
                <S.DateTitle>오늘</S.DateTitle>
              </S.DateBox>
            </S.InfoBox>
          </S.Content>

          <S.VerticalLine />

          <S.Content>
            <S.SubTitle>Contributions</S.SubTitle>
            <S.InfoBox>
              <S.GraphContainer>
                <S.GraphBox>
                  <S.Bars>
                    <S.Value value={contribYesterdayRatio}>{yesterdayContributors}</S.Value>
                    <S.Bar value={contribYesterdayRatio} />
                  </S.Bars>

                  <S.Bars>
                    <S.Value value={contribTodayRatio}>{todayContributors}</S.Value>
                    <S.Bar value={contribTodayRatio} />
                  </S.Bars>
                </S.GraphBox>
                <S.Line />
              </S.GraphContainer>

              <S.DateBox>
                <S.DateTitle>어제</S.DateTitle>
                <S.DateTitle>오늘</S.DateTitle>
              </S.DateBox>
            </S.InfoBox>
          </S.Content>
        </S.ContentBox>
      </S.ContentContainer>
    </S.TransitionContainer>
  );
};
