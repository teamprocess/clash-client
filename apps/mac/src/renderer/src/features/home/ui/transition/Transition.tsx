import * as S from "./Transition.style";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { useTransition } from "@/features/home/model/useTransition";
import { TransitionResponse } from "@/entities/home";
import { createTransitionSections, Section } from "@/features/home";

interface TransitionProps {
  data: TransitionResponse | null;
}

const GraphSection = (props: Section) => {
  const { title, leftLabel, rightLabel, leftValue, rightValue, leftRatio, rightRatio } = props;

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
  const { transitionData } = useTransition(data);
  const sections = createTransitionSections(transitionData);

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
