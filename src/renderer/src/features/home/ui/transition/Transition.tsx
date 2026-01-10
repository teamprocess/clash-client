import * as S from "./Transition.style";
import { TransitionProps } from "@/features/home/model/useHome";
import { Link } from "react-router-dom";

export const Transition = ({
  activeTransitionData,
  commitTransitionData,
  transitionMaxCommit,
  maxActive,
}: TransitionProps) => {
  return (
    <S.TransitionContainer>
      <S.TitleBox>
        <S.Title>어제와 비교</S.Title>
        <Link to="">
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
                  <S.Value value={activeTransitionData.yesterday} max={maxActive}>
                    {activeTransitionData.yesterday}
                  </S.Value>
                  <S.Bar value={activeTransitionData.yesterday} max={maxActive} />
                </S.Bars>
                <S.Bars>
                  <S.Value value={activeTransitionData.today} max={maxActive}>
                    {activeTransitionData.today}
                  </S.Value>
                  <S.Bar value={activeTransitionData.today} max={maxActive} />
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
                  <S.Value value={commitTransitionData.yesterday} max={transitionMaxCommit}>
                    {commitTransitionData.yesterday}
                  </S.Value>
                  <S.Bar value={commitTransitionData.yesterday} max={transitionMaxCommit} />
                </S.Bars>
                <S.Bars>
                  <S.Value value={commitTransitionData.today} max={transitionMaxCommit}>
                    {commitTransitionData.today}
                  </S.Value>
                  <S.Bar value={commitTransitionData.today} max={transitionMaxCommit} />
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
