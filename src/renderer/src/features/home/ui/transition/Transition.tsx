import * as S from "./Transition.style";
import { TransitionProps } from "@/features/home/model/useHome";
import { Link } from "react-router-dom";

export const Transition = ({
  activeTransdata,
  commitTransdata,
  TransitionmaxCommit,
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
                  <S.Value value={activeTransdata.yesterday} max={maxActive}>
                    {activeTransdata.yesterday}
                  </S.Value>
                  <S.Bar value={activeTransdata.yesterday} max={maxActive} />
                </S.Bars>
                <S.Bars>
                  <S.Value value={activeTransdata.today} max={maxActive}>
                    {activeTransdata.today}
                  </S.Value>
                  <S.Bar value={activeTransdata.today} max={maxActive} />
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
                  <S.Value value={commitTransdata.yesterday} max={TransitionmaxCommit}>
                    {commitTransdata.yesterday}
                  </S.Value>
                  <S.Bar value={commitTransdata.yesterday} max={TransitionmaxCommit} />
                </S.Bars>
                <S.Bars>
                  <S.Value value={commitTransdata.today} max={TransitionmaxCommit}>
                    {commitTransdata.today}
                  </S.Value>
                  <S.Bar value={commitTransdata.today} max={TransitionmaxCommit} />
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
