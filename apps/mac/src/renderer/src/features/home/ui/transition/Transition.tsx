import * as S from "./Transition.style";
import { Link } from "react-router-dom";
import { formatTime } from "@/shared/lib";
import { useTransition } from "@/features/home/model/useTransition";
import { TransitionResponse } from "@/entities/home";

interface TransitionProps {
  data: TransitionResponse | null;
}

export const Transition = ({ data }: TransitionProps) => {
  const getTransitionData = useTransition(data);

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
              <S.GraphBox>
                <S.Bars>
                  <S.Value
                    value={getTransitionData.transitionData?.activeTime.yesterdayActiveTime ?? 0}
                    max={getTransitionData.maxActive}
                  >
                    {formatTime(
                      getTransitionData.transitionData?.activeTime.yesterdayActiveTime ?? 0
                    )}
                  </S.Value>
                  <S.Bar
                    value={getTransitionData.transitionData?.activeTime.yesterdayActiveTime ?? 0}
                    max={getTransitionData.maxActive}
                  />
                </S.Bars>
                <S.Bars>
                  <S.Value
                    value={getTransitionData.transitionData?.activeTime.todayActiveTime ?? 0}
                    max={getTransitionData.maxActive}
                  >
                    {formatTime(getTransitionData.transitionData?.activeTime.todayActiveTime ?? 0)}
                  </S.Value>
                  <S.Bar
                    value={getTransitionData.transitionData?.activeTime.todayActiveTime ?? 0}
                    max={getTransitionData.maxActive}
                  />
                </S.Bars>
              </S.GraphBox>
              <S.Line />
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
              <S.GraphBox>
                <S.Bars>
                  <S.Value
                    value={
                      getTransitionData.transitionData?.contributors.yesterdayContributors ?? 0
                    }
                    max={getTransitionData.maxContributors}
                  >
                    {getTransitionData.transitionData?.contributors.yesterdayContributors ?? 0}
                  </S.Value>
                  <S.Bar
                    value={
                      getTransitionData.transitionData?.contributors.yesterdayContributors ?? 0
                    }
                    max={getTransitionData.maxContributors}
                  />
                </S.Bars>
                <S.Bars>
                  <S.Value
                    value={getTransitionData.transitionData?.contributors.todayContributors ?? 0}
                    max={getTransitionData.maxContributors}
                  >
                    {getTransitionData.transitionData?.contributors.todayContributors ?? 0}
                  </S.Value>
                  <S.Bar
                    value={getTransitionData.transitionData?.contributors.todayContributors ?? 0}
                    max={getTransitionData.maxContributors}
                  />
                </S.Bars>
              </S.GraphBox>
              <S.Line />
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
