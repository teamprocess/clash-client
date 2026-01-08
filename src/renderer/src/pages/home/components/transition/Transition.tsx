import * as S from "./Transition.style";

export const Transition = () => {
  interface GETTransitionData {
    yesterday: number;
    today: number;
  }

  const activeTransdata: GETTransitionData = {
    //초단위 ~> 시간단위표기
    yesterday: 21522,
    today: 53608,
  };

  const commitTransdata: GETTransitionData = {
    yesterday: 27,
    today: 34,
  };

  const maxCommit = Math.max(commitTransdata.yesterday, commitTransdata.today);
  const maxActive = Math.max(activeTransdata.yesterday, activeTransdata.today);

  return (
    <S.TransitionContainer>
      <S.Title>어제와 비교</S.Title>
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
                  <S.Value value={commitTransdata.yesterday} max={maxCommit}>
                    {commitTransdata.yesterday}
                  </S.Value>
                  <S.Bar value={commitTransdata.yesterday} max={maxCommit} />
                </S.Bars>
                <S.Bars>
                  <S.Value value={commitTransdata.today} max={maxCommit}>
                    {commitTransdata.today}
                  </S.Value>
                  <S.Bar value={commitTransdata.today} max={maxCommit} />
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
