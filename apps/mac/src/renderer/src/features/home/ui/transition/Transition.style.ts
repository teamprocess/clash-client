import styled from "styled-components";
import { font } from "@clash/design-tokens/font";
import DetailArrow from "../../../../shared/ui/assets/front.svg";

export const TransitionContainer = styled.div`
  padding: clamp(1rem, 2vw, 1.5rem);
  width: 100%;
  height: 100%;
  min-height: 0;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.background.normal};
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

export const TitleBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

export const Title = styled.div`
  ${font.title2.bold}
`;

export const ArrowBox = styled.div`
  ${font.label.medium}
  color: ${({ theme }) => theme.label.alternative};
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const DetailArrowIcon = styled(DetailArrow)`
  width: 0.5rem;
  height: 1rem;
`;

export const SubTitle = styled.div`
  ${font.headline2.bold}
  padding: 0 clamp(0.5rem, 1.5vw, 0.75rem);
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  min-height: 0;
  padding-top: clamp(0.75rem, 2vw, 1rem);
`;

export const ContentBox = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  width: 100%;
  flex: 1;
  min-height: 0;
  gap: clamp(0.75rem, 2vw, 1rem);

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Content = styled.div`
  flex: 1;
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: clamp(0.75rem, 2vw, 1.25rem);
`;

export const InfoBox = styled.div`
  padding: clamp(0.75rem, 2vw, 1rem);
  width: 100%;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: clamp(0.5rem, 1.5vw, 0.75rem);
  box-sizing: border-box;
`;

export const DateBox = styled.div`
  display: flex;
`;

export const DateTitle = styled.div`
  ${font.label.medium}
  width: 100%;
  display: flex;
  justify-content: center;
  color: ${({ theme }) => theme.label.alternative};
`;

export const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.line.normal};
`;

export const VerticalLine = styled.div`
  width: 2px;
  align-self: stretch;
  background-color: ${({ theme }) => theme.line.neutral};

  @media (max-width: 768px) {
    width: 100%;
    height: 1px;
  }
`;

export const GraphContainer = styled.div`
  width: 100%;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const GraphBox = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  flex: 1;
  padding-bottom: 0.625rem;
  min-height: 0;
`;

export const Bars = styled.div`
  position: relative;
  width: 100%;
  height: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;

type RatioProps = {
  value: number;
};

export const Value = styled.p<RatioProps>`
  ${font.body.medium}
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: ${({ value }) => `calc(${value * 100}% + 0.4rem)`};
  transition: bottom 0.4s ease;
  white-space: nowrap;
  font-size: clamp(0.75rem, 1.8vw, 1rem);
`;

export const Bar = styled.div<RatioProps>`
  width: clamp(1.5rem, 6vw, 2.5rem);
  height: 100%;
  border-radius: 0.25rem;
  background-color: ${({ theme }) => theme.primary.normal};
  transform-origin: bottom;
  transform: ${({ value }) => `scaleY(${value})`};
  transition: transform 0.4s ease;
`;
