import * as S from "./Transition.style";
import { Link } from "react-router-dom";
import { formatTime } from "@/shared/lib";
import { TransitionProps } from "@/features/home/model/useTransition";

export const Transition = ({ transitionData, maxActive, maxContributors }: TransitionProps) => {
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
                    value={transitionData?.activeTime.yesterdayActiveTime ?? 0}
                    max={maxActive}
                  >
                    {formatTime(transitionData?.activeTime.yesterdayActiveTime ?? 0)}
                  </S.Value>
                  <S.Bar
                    value={transitionData?.activeTime.yesterdayActiveTime ?? 0}
                    max={maxActive}
                  />
                </S.Bars>
                <S.Bars>
                  <S.Value value={transitionData?.activeTime.todayActiveTime ?? 0} max={maxActive}>
                    {transitionData?.activeTime.todayActiveTime ?? 0}
                  </S.Value>
                  <S.Bar value={transitionData?.activeTime.todayActiveTime ?? 0} max={maxActive} />
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
            <S.SubTitle>Commit 수</S.SubTitle>
            <S.InfoBox>
              <S.GraphBox>
                <S.Bars>
                  <S.Value
                    value={transitionData?.contributors.yesterdayContributors ?? 0}
                    max={maxContributors}
                  >
                    {transitionData?.contributors.yesterdayContributors ?? 0}
                  </S.Value>
                  <S.Bar
                    value={transitionData?.contributors.yesterdayContributors ?? 0}
                    max={maxContributors}
                  />
                </S.Bars>
                <S.Bars>
                  <S.Value
                    value={transitionData?.contributors.todayContributors ?? 0}
                    max={maxContributors}
                  >
                    {transitionData?.contributors.todayContributors ?? 0}
                  </S.Value>
                  <S.Bar
                    value={transitionData?.contributors.todayContributors ?? 0}
                    max={maxContributors}
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
