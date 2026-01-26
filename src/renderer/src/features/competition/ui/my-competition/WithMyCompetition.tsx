import * as S from "./WithMyCompetition.style";
import { GrowthRate } from "@/features/home/ui/compare/growth-rate/GrowthRate";
import { useMyCompetition } from "@/features/competition/model/useMyCompetition";
import { CompareStandard } from "@/entities/competition/model/my-competition/myCompetition.types";

export const WithMyCompetition = () => {
  const { myCompetition } = useMyCompetition();

  return (
    <S.ContentArea>
      <S.GraphWrapper>
        <S.AnalyzeTitle>내 성장도 분석</S.AnalyzeTitle>
        <S.GraphBox>
          <S.Bars>
            {myCompetition.myData.map(({ date, growth_rate }) => (
              <S.BarWrapper key={date}>
                <S.Bar $ratio={growth_rate / myCompetition.myCompetitionMaxCommit}>
                  <S.ValueHoverBox>
                    <S.BallValue />
                    <S.BarValue>{myCompetition.oneDecimal(growth_rate)}%</S.BarValue>
                  </S.ValueHoverBox>
                </S.Bar>
                <S.BarLabel>{date}월</S.BarLabel>
              </S.BarWrapper>
            ))}
          </S.Bars>
        </S.GraphBox>
      </S.GraphWrapper>

      <S.Line />

      <S.GraphWrapper>
        <S.TitleBox>
          <S.AnalyzeTitle>내 기록 비교</S.AnalyzeTitle>
          <S.SubText>각 기간 동안 기록한 스탯의 평균을 비교합니다.</S.SubText>
        </S.TitleBox>

        <S.CompareContainer>
          <S.CompareBox>
            <S.TextBox>
              <S.CompareBoxTitle>비교1</S.CompareBoxTitle>
              <S.DateText>오늘</S.DateText>
            </S.TextBox>

            <S.GridContainer>
              <S.GridBox>
                <S.DataBoxing>
                  <S.ImpressiveBox>
                    <S.EXPIcon />
                    <S.ExplainText>총 획득 EXP</S.ExplainText>
                  </S.ImpressiveBox>
                  <S.DataText>
                    {myCompetition.oneDecimal(myCompetition.myCompareData?.earnedExp)} EXP
                  </S.DataText>
                </S.DataBoxing>
              </S.GridBox>

              <S.GridBox>
                <S.DataBoxing>
                  <S.ImpressiveBox>
                    <S.RecordIcon />
                    <S.ExplainText>학습시간</S.ExplainText>
                  </S.ImpressiveBox>
                  <S.DataText>
                    {myCompetition.oneDecimal(myCompetition.myCompareData?.studyTime)} 시간
                  </S.DataText>
                </S.DataBoxing>
              </S.GridBox>

              <S.GridBox>
                <S.DataBoxing>
                  <S.ImpressiveBox>
                    <S.SolvedAcIcon />
                    <S.ExplainText>
                      solved.ac
                      <br />
                      문제 해결 수
                    </S.ExplainText>
                  </S.ImpressiveBox>
                  <S.DataText>0 문제</S.DataText>
                </S.DataBoxing>
              </S.GridBox>

              <S.GridBox>
                <S.DataBoxing>
                  <S.ImpressiveBox>
                    <S.GithubIcon />
                    <S.ExplainText>
                      Github
                      <br />
                      기여수
                    </S.ExplainText>
                  </S.ImpressiveBox>
                  <S.DataText>
                    {myCompetition.oneDecimal(myCompetition.myCompareData?.gitHubAttribution)}
                  </S.DataText>
                </S.DataBoxing>
              </S.GridBox>
            </S.GridContainer>
          </S.CompareBox>

          <S.CompareBox>
            <S.TextBox>
              <S.CompareBoxTitle>비교2</S.CompareBoxTitle>
              <S.SelectWrapper>
                <S.Select
                  value={myCompetition.competitionDropdown}
                  onChange={e =>
                    myCompetition.setCompetitionDropdown(e.target.value as CompareStandard)
                  }
                >
                  {myCompetition.competitionDropDownValue.map(option => (
                    <S.Option key={option.key} value={option.key}>
                      {option.label}
                    </S.Option>
                  ))}
                </S.Select>
                <S.ArrowIcon />
              </S.SelectWrapper>
            </S.TextBox>

            <S.GridContainer>
              <S.GridBox>
                <S.DataBoxing>
                  <S.ImpressiveBox>
                    <S.EXPIcon />
                    <S.ExplainText>총 획득 EXP</S.ExplainText>
                  </S.ImpressiveBox>
                  <S.GrowthRateBox>
                    <S.DataText>
                      {myCompetition.oneDecimal(myCompetition.myCompareData?.earnedExp)} EXP
                    </S.DataText>
                    <GrowthRate
                      yesterday={myCompetition.oneDecimal(myCompetition.myCompareData?.earnedExp)}
                      today={myCompetition.oneDecimal(myCompetition.myCompareData?.earnedExp)}
                    />
                  </S.GrowthRateBox>
                </S.DataBoxing>
              </S.GridBox>

              <S.GridBox>
                <S.DataBoxing>
                  <S.ImpressiveBox>
                    <S.RecordIcon />
                    <S.ExplainText>학습시간</S.ExplainText>
                  </S.ImpressiveBox>
                  <S.GrowthRateBox>
                    <S.DataText>
                      {myCompetition.oneDecimal(myCompetition.myCompareData?.studyTime)} 시간
                    </S.DataText>
                    <GrowthRate
                      yesterday={myCompetition.oneDecimal(myCompetition.myCompareData?.studyTime)}
                      today={myCompetition.oneDecimal(myCompetition.myCompareData?.studyTime)}
                    />
                  </S.GrowthRateBox>
                </S.DataBoxing>
              </S.GridBox>

              <S.GridBox>
                <S.DataBoxing>
                  <S.ImpressiveBox>
                    <S.SolvedAcIcon />
                    <S.ExplainText>
                      solved.ac
                      <br />
                      문제 해결 수
                    </S.ExplainText>
                  </S.ImpressiveBox>
                  <S.DataText>0 문제</S.DataText>
                </S.DataBoxing>
              </S.GridBox>

              <S.GridBox>
                <S.DataBoxing>
                  <S.ImpressiveBox>
                    <S.GithubIcon />
                    <S.ExplainText>
                      Github
                      <br />
                      기여수
                    </S.ExplainText>
                  </S.ImpressiveBox>
                  <S.GrowthRateBox>
                    <S.DataText>
                      {myCompetition.oneDecimal(myCompetition.myCompareData?.gitHubAttribution)}
                    </S.DataText>
                    <GrowthRate
                      yesterday={myCompetition.oneDecimal(
                        myCompetition.myCompareData?.gitHubAttribution
                      )}
                      today={myCompetition.oneDecimal(
                        myCompetition.myCompareData?.gitHubAttribution
                      )}
                    />
                  </S.GrowthRateBox>
                </S.DataBoxing>
              </S.GridBox>
            </S.GridContainer>
          </S.CompareBox>
        </S.CompareContainer>
      </S.GraphWrapper>
    </S.ContentArea>
  );
};
