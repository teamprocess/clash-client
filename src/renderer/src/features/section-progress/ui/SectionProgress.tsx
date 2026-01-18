import * as S from "./SectionProgress.style";

export const SectionProgress = () => {
  return (
    <S.SectionProgressContainer>
      <S.ProgressInfoBox>
        <S.RoadmapIcon />
        <S.StepCount>
          <span style={{ color: "red" }}>3</span> / 50
        </S.StepCount>
      </S.ProgressInfoBox>
      <S.ProgressBarWrapper>
        <S.BarBackground>
          <S.BarActive $fill={40} />
        </S.BarBackground>
        <S.PercentText>40%</S.PercentText>
      </S.ProgressBarWrapper>
    </S.SectionProgressContainer>
  );
};
